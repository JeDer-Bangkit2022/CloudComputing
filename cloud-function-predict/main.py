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
        def preprocess(uploaded_picture):
            img = tf.keras.utils.load_img(uploaded_picture, target_size=(150, 150))
            x = tf.keras.preprocessing.image.img_to_array(img)
            x = np.expand_dims(x, axis=0)
            x = tf.keras.applications.xception.preprocess_input(x)

            image = np.vstack([x])
            return image

        def download_blob(bucket_name, source_blob_name):

            storage_client = storage.Client()
            bucket = storage_client.bucket(bucket_name)
            blob = bucket.blob(source_blob_name)
            uploaded_picture = '/tmp/'+source_blob_name
            blob.download_to_filename(uploaded_picture)

            return uploaded_picture

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

        #download uploaded-picture from GCS Bucket
        uploaded_picture = download_blob('test-bucket-for-new-model', file['name'])
        
        print("File Successfully Downloaded")

        #preprocess the picture
        image = preprocess(uploaded_picture)

        #predict picture with Machine Learning Model from AI Platform and making json file out of the result
        project_name = 'named-reporter-343719'
        region = 'asia-southeast1'
        model = 'test_model'
        version = 'model_version2'
        instances = image.tolist()
        response = predict_json(project_name, region, model, instances, version)
        probability = response[0]
        result_idx = np.argmax(probability)

        print("Prediction process done!")
        
        labels = ['Akar Kelapa', 'Bakmi', 'Bakso', 'Kue Bangkit', 'Kue Tambang', 'Nasi Goreng', 'Nastar', 'Onde Onde', 'Orek Tempe', 'Rendang', 'Sate', 'Semur Tahu']
        food_result = labels[result_idx]
        confidence = max(probability) * 100

        print("Prediction Result: ")
        print('Model Prediction: \n{}'.format(food_result))
        print('Confidence: {:.2f} %'.format(confidence))
        
        result_json = {"Prediction": food_result,"Confidence": confidence}

        #upload the result to GCS
        storage_client = storage.Client()
        bucket = storage_client.bucket('test-bucket-for-new-model')
        blob = bucket.blob('result.json')

        blob.upload_from_string(
          data=json.dumps(result_json),
          content_type='application/json'
          )

        print("Result uploaded to GCS")
