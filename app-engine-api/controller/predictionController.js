const recipe = require('../models/recipe');
const Result = require('../models/result');
const axios = require('axios');
const uploadImage = require('./imgController');

//get all data that own by a user
const getAllPrediction = async (req, res) => {
  try {
    const prediction = await Result.find({ createdBy: req.creds.userId }).sort('createdAt');

    // //get the food name of every prediction 
    let foodName = [];
    prediction.map((item) => {
      foodName.push(item.result);
    })

    let responData = []
    await Promise.all(foodName.map(async (d, i) => {
      const foodData = await recipe.findOne({ name: d });
      responData.push({
        id: prediction[i]._id,
        name: prediction[i].result,
        imageUrl: prediction[i].imageUrl,
        description: foodData.description
      });
    }));

    console.log("getting all data");
    res.status(200).json({ success: true, count: prediction.length, responData});
  } catch(error) {
    res.status(500).json({success: false, msg: error});
  }
};

const getPredictionByID = async (req,res) => {
  try{
    const {id:predictionID} = req.params;
    //check if the id is exist and owned by user
    const prediction = await Result.findOne({_id: predictionID, createdBy: req.creds.userId});
    if (!prediction) {
      return res
      .status(404).json({  succsess: false, msg: `no prediction with id ${predictionID}` })
    }

    //get the food detailed info
    const recipeData = await recipe.findOne({ name: prediction.result });
    if(!recipeData) {
      return res.status(404).json({  succsess: false, msg: `no recipe with food ${prediction.result}` })
    }
    const resPrediction = { name: prediction.name, resep: recipeData.recipe, video: recipeData.video }
    
    res.status(200).json({ success: true, resPrediction });

    } catch(error) {
    res.status(500).json({ success: false, msg:error });
  } 
}

const newFoodPrediction = async (req, res) => {
  try {
    const createdBy = req.creds.userId;

    //upload image to bucket and get the url
    const imageUrl = await uploadImage(req.file);
    //do prediction to the model and return the result


    // axios.post('http://link-to-ml-model', {
    //   imageUrl
    // })
    // .then((response) => {
    //   console.log(response);
    // }, (error) => {
    //   console.log(error);
    // });

    const result = 'Soto';
    //make a json response that pretty much have all of it + upload to db for stuff

    const detailPred = await recipe.findOne({ name : result });

    const data = {
       createdBy,   
       imageUrl,
       result
     }

     const dbResult = await Result.create(data);
     const fnlResult = {
       result: dbResult.result,
       recipe: detailPred.recipe,
       ytCode: detailPred.video
     };

     
    res.status(201).json({ success: true, fnlResult });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
}

const deleteResultByID = async (req, res) => {
  try{
    const { id:resultID } = req.params;
    const result = await Result.findOneAndDelete({ _id: resultID, createdBy: req.creds.userId});
    if (!result) {
      return res.status(404).json({ success: false, msg: `No result with id : ${resultID}` })
    }
    res.status(200).json({ success: true, msg: `${result.id} succesfully deleted` });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error });
  }
}

module.exports = { getAllPrediction, getPredictionByID, newFoodPrediction, deleteResultByID };