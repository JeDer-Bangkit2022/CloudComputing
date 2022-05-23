const express = require('express');
const router = new express.Router();
const predictController = require('../controller/predictionController');

router.get('/', predictController.getAllPrediction);
router.get('/:id',  predictController.getPredictionByID);
router.post('/',  predictController.newFoodPrediction);
router.delete('/:id',  predictController.deleteResultByID);

module.exports = router;