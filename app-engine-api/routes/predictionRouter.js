const express = require('express');
const router = new express.Router();
const predictController = require('../controller/predictionController');
const multerMid = require('../middleware/multerMid');

router.get('/history', predictController.getAllPrediction);
router.get('/history/:id', predictController.getPredictionByID);
router.post('/', multerMid, predictController.newFoodPrediction);
router.delete('/history/:id', predictController.deleteResultByID);

module.exports = router;