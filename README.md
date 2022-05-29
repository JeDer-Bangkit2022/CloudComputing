# CloudComputing
This repository is used to keep track of the CC Team backend services

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
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjkzNGJiM2JlZTlkZmViNDMyNGQ0ZTMiLCJuYW1lIjoiSm9obiIsImlhdCI6MTY1MzgyMDM0MCwiZXhwIjoxNjU2NDEyMzQwfQ.4jqc9nfWpQ28rEruyKkcSLO415aBpMVRNehO5d6rVrM"
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
    "fnlResult": {
        "createdBy": "628baad06373f0d3ac94285b",
        "imageUrl": "https://storage.googleapis.com/test-img-bucket-1/farm-house.jpg",
        "result": "Soto",
        "_id": "6293ad4da69caca19d995de5",
        "__v": 0
    }
}
```

## GET ALL PREDICTION

get data of prediction that requested by a user

**ENDPOINT** : `/prediction`

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
            "name": "Bakso",
            "imageUrl": "gs://Bakso",
            "description": "Bakso merupakan salah satu makanan favorit orang Indonesia. Banyak kreasi bakso, salah satunya terbuat dari ikan. Bahan dasar bakso ikan terdiri dari ikan, tepung, dan bumbu. Paling penting menggunakan ikan yang segar untuk menghasilkan bakso dengan kualitas yang baik."
        },
        {
            "id": "628c8fa2df5de52dd32dde60",
            "name": "Soto",
            "imageUrl": "gs://soto",
            "description": "Soto, sroto, sauto, tauto, atau coto adalah makanan khas Indonesia seperti sop yang terbuat dari kaldu daging dan sayuran. Daging yang paling sering digunakan adalah daging sapi dan daging ayam, tetapi ada pula yang menggunakan daging babi atau daging kambing. Berbagai daerah di Indonesia memiliki soto khas daerahnya masing-masing dengan komposisi yang berbeda-beda, misalnya Soto Madura, Soto Kediri, Soto Pemalang, Soto Lamongan, Soto Jepara, Soto Semarang, Soto Kudus, Soto Betawi, Soto Padang, Soto Bandung, Tauto Pekalongan, Sroto Sokaraja, Sroto Kriyik, Sroto Bancar, Soto Banjar, Soto Medan, dan Coto Makassar. Soto juga diberi nama sesuai isinya, misalnya Soto ayam, Soto babat, atau Soto kambing. Ada pula soto yang dibuat dari daging kaki sapi yang disebut dengan soto sekengkel. "
        }
    ]
}
```

&nbsp;
&nbsp;

## get prediction by id

get specific prediction result by id

**EndPoint** : `/prediction/:id`

**Method** : `GET`

**Auth required** : YES

**No Data must provided**

## Success Response

**Condition** : If everything is OK.

**Code** : `200`

**Content example**

```json
    {
      {
    "success": true,
    "resPrediction": {
        "resep": "Resep Soto Ayam Lamongan (untuk 9-10 porsi)\n\nBahan:\n6-8 siung bawang putih\n8 siung bawang merah ukuran sedang\n6 buah kemiri\n1-2 buah kunyit bakar, kupas\nMinyak goreng\n6 pcs sayap ayam\n4 batang daun bawang\n4 batang serai\n10 lembar daun salam\n10 lembar daun jeruk\n1 sdm garam\n½ sdt merica\n½ sdt gula\n1 sdt penyedap\n1 sdt kaldu ayam\n\nPelengkap:\nKol, rebus, iris\nTelur, rebus, potong jadi dua bagian\nSoun, rendam air\nSeledri, iris\n4 pcs fillet paha ayam\nJeruk nipis, potong menjadi lima bagian\nCabai rawit, rebus\nKecap manis\n\nSerbuk koya:\nKerupuk udang\nBawang putih goreng\n\nLangkah:\n1. Blender bumbu halus dengan minyak, lalu tumis sampai minyak keluar\n2. Masukkan serai, daun salam dan daun jeruk, masak sampai kering\n3. Masukkan sayap ayam dan daun bawang, aduk rata\n4. Tambahkan air, rebus dengan api besar selama 30 menit-60 menit\n5. Tambahkan gula, garam, merica, kaldu ayam, dan penyedap\n6. Tambahkan air jika air kuah soto menyusut\n7. Masukkan paha ayam fillet ke dalam kuah, masak hingga 20 menit\n8. Untuk serbuk koya, blender bawang putih goreng \n9. Masukkan kerupuk udang ke dalam plastik, lalu tumbuk sampai halus\n10. Campurkan kerupuk dengan bawang putih, aduk rata, lalu masukkan ke dalam wadah Biggy Aquamarin Prasmanan Set\n11. Untuk sohun, bilas dengan air panas sampai empuk, lalu bilas kembali dengan air dingin\n12. Keluarkan paha ayam, lalu potong-potong, sisihkan\n13. Masukkan pelengkap ke dalam wadah Biggy Aquamarin Prasmanan Set \n14. Sajikan kuah soto dengan kol, soun, irisan paha ayam, telur rebus, cabai rawit, seledri, jeruk nipis, serbuk koya, dan kecap manis sebagai pelengkap",
        "video": "cqSDDmYqRgg"
    }
  }
}
```

&nbsp;
&nbsp;

# Delete history result by id

Delete a result from db by id

**ENDPOINT** : `/prediction/:id`

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
