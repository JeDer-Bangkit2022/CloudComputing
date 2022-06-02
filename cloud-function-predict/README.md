# Deploying Custom Model and Getting Online Prediction

This script (main.py) was used to automate the online prediction process through [Google Cloud Function](https://cloud.google.com/functions) service and access custom Machine Learning models that has been deployed using [Google AI Platform](https://cloud.google.com/ai-platform/docs) which stored in [Google Cloud Storage](https://cloud.google.com/storage). The food-picture that are uploaded to cloud storage will be processed and the resulting prediction will be stored back to Google Cloud Storage in a JSON format.

## Implementation Process

- Create a bucket in Google Cloud Storage, make sure the bucket is accessible to the public.
- Store the machine learning model using SavedModel or Protobuf format in the bucket.
- Deploy the custom machine learning model through AI Platform and create a model version to deploy.
- Create a Google Cloud Function script with Google Cloud Storage Trigger referencing to the bucket which we upload the picture into.
- Create functions in the GCF script that has three purposes which are downlading the uploaded picture into GCF temp directory, making the prediction using ai platform model that has been deployed, and uploading the result back into Google Cloud Storage.
- Deploy the Google Cloud Functions to make online predictions.

