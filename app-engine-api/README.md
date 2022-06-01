## USER REGISTER

**URL** : `https://named-reporter-343719.as.r.appspot.com`

**Endpoint** : `/user/register`

**Method** : `POST`

**Request Body example**

```json
{
    "name": "Kobo",
    "email": "kobokanaeru@hlv.id",
    "password": "bokobokobo"
}

```

### Success Response

**Code** : `200`

**JSON Response example**

```json
{
    "success": true,
    "user": {
        "id": "62934bb3bee9dfeb4324d4e3",
        "name": "Kobo"
    }
}

```

## USER LOGIN

**Endpoint** : /user/login

**Method** : `POST`

**Request Body Example**

```json
{
    "email": "kobokanaeru@hlv.id",
    "password": "bokobokobo"
}

```

### Success Response

**Code** : `200`

**Content example**

```json
{
    "success": true,
    "user": {
        "id": "628baad06373f0d3ac94285b",
        "name": "Kobo"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjhiYWFkMDYzNzNmMGQzYWM5NDI4NWIiLCJuYW1lIjoiS29ibyIsImlhdCI6MTY1MzgyMTU4NiwiZXhwIjoxNjU2NDEzNTg2fQ.TVeykzKK8qBQ7km1Ci-FuTsNRiQ3AvpE-4Ewpi2uNeM"
}
```

## POST NEW PREDICTION

Post a picture to get new prediction

**ENDPOINT** : `/prediction`

**Method** : `POST`

**Auth required** : YES

**Request Header**

```
Authorization : Bearer `${jwt-token}`
```

**Request Body**

```
//form-data in postman, idk
`image : image.jpg`
```
## Success Response

**Code** : `200`

**JSON Response example**

```json
{
    "success": true,
    "result": "Nastar",
    "resultAccuracy": 100,
    "imageUrl": "https://storage.googleapis.com/test-bucket-for-new-model/628baad06373f0d3ac94285b_Nastar.jpg",
    "recipe": "resep Nastar",
    "description": "deskripsi Nastar",
    "ytCode": "cM963tI7Q_k"
}  
```

## GET ALL PREDICTION

get data of prediction that requested by a user

**ENDPOINT** : `/prediction/history`

**Method** : `GET`

**Auth required** : YES

**Request Header**

```
Authorization : Bearer `${jwt-token}`
```

## Success Response

**Code** : `200`

**JSON Response example**

```json
{
    "success": true,
    "count": 2,
    "responData": [
        {
            "id": "628c8f9ddf5de52dd32dde5e",
            "timestamp": "2022-05-31",
            "name": "Bakso",
            "imageUrl": "gs://Bakso",
            "description": "Deskripsi Bakso"
        },
        {
            "id": "628c8fa2df5de52dd32dde60",
            "name": "Soto",
            "imageUrl": "gs://soto",
            "description": "Deskripsi Soto"
        }
    ]
}
```

&nbsp;
&nbsp;

## get prediction by id

get specific prediction result by id

**EndPoint** : `/prediction/history/:id`

**Method** : `GET`

**Auth required** : YES

**No Data must provided**

## Success Response

**Condition** : If everything is OK.

**Code** : `200`

**Content example**

```json
{
    "success": true,
    "result": "Rendang",
    "resultAccuracy": 100,
    "imageUrl": "https://storage.googleapis.com/test-img-bucket-1/history.jpg",
    "recipe": "Iki Isina Resep Rendang",
    "description": "Iki isina Deskripsi Rendang",
    "ytCode": "GNfRXKsvG04" 
}
```

&nbsp;
&nbsp;

# Delete history result by id

Delete a result from db by id

**ENDPOINT** : `/prediction/history/:id`

**Method** : `DELETE`

**Auth required** : YES

**No Data body required**

## Success Response

**Condition** : If everything is OK.

**Code** : `200`

**Response example**

```json
    {
    "success": true,
    "msg": "629399f3fa227d506fafb15d succesfully deleted"
}
```
