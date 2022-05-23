const recipe = require('../models/recipe');
const Result = require('../models/result');


//get all data that own by a user
const getAllPrediction = async (req, res) => {
  try {
    const prediction = await Result.find({ createdBy: req.creds.userId }).sort('createdAt');
    //TODO: get imgURL and Desc from recipe database
    console.log("getting all data");
    res.status(200).json({ success: true, count: prediction.length, prediction});
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
    req.body.createdBy = req.creds.userId
    //upload image to bucket and get the url
    //do prediction to the model and return the result
    //make a json response that pretty much have all of it + upload to db for stuff

    const tempreq = { ...req.body, imageURL: 'gs://', result: 'Soto' };

    const result = await Result.create(tempreq);
    res.status(201).json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, msg: error });
  }
}

const deleteResultByID = async (req, res) => {
  try{
    const { id:resultID } = req.params;
    const result = await Result.findOneAndDelete({ _id: resultID, createdBy: userId});
    if (!result) {
      return res.status(404).json({ success: false, msg: `No task with id : ${taskID}` })
    }
    res.status(200).json({ success: true, msg: `${result.id} succesfully deleted` });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error });
  }
}

module.exports = { getAllPrediction, getPredictionByID, newFoodPrediction, deleteResultByID };