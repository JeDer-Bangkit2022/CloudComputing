const Result = require('../models/result');

//get all data that own by a user
const getAllPrediction = async (req, res) => {
  try {
    console.log(req.body);
    const { owner: resultOwner } = req.body;
    console.log({ owner: resultOwner })
    const result = await Result.find({});
    console.log("getting all data");
    res.status(200).json({result})
  } catch(error) {
    res.status(500).json({msg: error});
  }
};

const getPredictionByID = async (req,res) => {
  try{
    const {id:resultID} = req.params;
    const result = await Result.findOne({ _id:resultID});
    if (!result) {
      return res
      .status(404)
      .json({  msg: `no prediction with id ${resultID}` })
    }

    res.status(200).json({ result });

    } catch(error) {
    res.status(500).json({ msg:error });
  }
}

const newFoodPrediction = async (req, res) => {
  try {
    const result = await Result.create(req.body);
    //upload image to bucket and get the url
    //do prediction to the model and return the result
    //make a json response that pretty much have all of it + upload to db for stuff
    res.status(201).json({ result });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
}

const deleteResultByID = async (req, res) => {
  try{
    const { id:resultID } = req.params;
    const result = await Result.findOneAndDelete({ _id: resultID });
    if (!result) {
      return res.status(404).json({ status: 'failed', msg: `No task with id : ${taskID}` })
    }
    res.status(200).json({ status: 'success', msg: `${result.id} succesfully deleted` });
  } catch (error) {
    return res.status(500).json({ status: 'failed', msg: error });
  }
}

module.exports = { getAllPrediction, getPredictionByID, newFoodPrediction, deleteResultByID };