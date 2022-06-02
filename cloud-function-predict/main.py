import googleapiclient.discovery
import tensorflow as tf
import numpy as np
import json
from google.cloud import storage
from google.api_core.client_options import ClientOptions
from PIL import Image

def cloud_storage_trigger(event, context):

    file = event
    if '.jpeg' in file['name'] or '.jpg' in file['name']  or '.png' in file['name']:
        def preprocess(uploaded_image):
            
            img = tf.keras.utils.load_img(uploaded_image, target_size=(150, 150))
            x = tf.keras.preprocessing.image.img_to_array(img)
            x = np.expand_dims(x, axis=0)
            x = tf.keras.applications.xception.preprocess_input(x)
            image = np.vstack([x])

            return image

        def download_image(bucket_name, source_image_name):
           
            storage_client = storage.Client()
            bucket = storage_client.bucket(bucket_name)
            blob = bucket.blob(source_image_name)
            uploaded_image = '/tmp/'+source_image_name
            blob.download_to_filename(uploaded_image)

            return uploaded_image

        def predict_json(project, region, model, instances, version=None):
      
            prefix = "{}-ml".format(region) if region else "ml"
            api_endpoint = "https://{}.googleapis.com".format(prefix)
            client_options = ClientOptions(api_endpoint=api_endpoint)
            service = googleapiclient.discovery.build(
            'ml', 'v1', client_options=client_options)
            name = 'projects/{}/models/{}'.format(project, model)

            if version is not None:
              name += '/versions/{}'.format(version)

            response = service.projects().predict(
              name=name,
              body={'instances': instances}
            ).execute()

            if 'error' in response:
              raise RuntimeError(response['error'])

            return response['predictions']

        #Download uploaded-image from GCS Bucket
        uploaded_image = download_image('jeder-storage-bucket', file['name'])
        
        print("File Successfully Downloaded")

        #Preprocess the image
        image = preprocess(uploaded_image)

        #Predict image with Machine Learning Model from AI Platform then make JSON file out of the result
        project_name = 'capstone-project-jeder'
        region = 'asia-southeast1'
        model = 'jeder_classification_model'
        version = 'version_1'
        instances = image.tolist()
        result = predict_json(project_name, region, model, instances, version)
        probability = result[0]
        top_idx = np.argmax(probability)

        print("Prediction process done!")
        
        labels = ['Akar Kelapa', 'Bakmi', 'Bakso', 'Kue Bangkit', 'Kue Tambang', 'Nasi Goreng', 'Nastar', 'Onde Onde', 'Orek Tempe', 'Rendang', 'Sate', 'Semur Tahu']
        food_result = labels[top_idx]
        confidence = max(probability) * 100

        print("Prediction Result: ")
        print('Model Prediction: \n{}'.format(food_result))
        print('Confidence: {:.2f} %'.format(confidence))
        
        result_json = {"Prediction": food_result,"Confidence": confidence}

        #Upload the result to GCS Bucket
        storage_client = storage.Client()
        bucket = storage_client.bucket('jeder-storage-bucket')
        blob = bucket.blob('result.json')

        blob.upload_from_string(
          data = json.dumps(result_json),
          content_type = 'application/json'
          )

        print("Result uploaded to GCS")
