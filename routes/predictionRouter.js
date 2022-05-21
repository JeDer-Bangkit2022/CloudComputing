const express = require('express');
const router = new express.Router();
const foodController = require('../controller/predictionController');

router.get('/', foodController.getAllPrediction);
router.get('/:id', foodController.getPredictionByID);
router.post('/', foodController.newFoodPrediction);
router.delete('/:id', foodController.deleteResultByID);

module.exports = router;