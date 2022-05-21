const foodRouter = require('./routes/predictionRouter');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db/connect');
require('dotenv').config();
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(cors({origin: true}));
app.use('/prediction', foodRouter);

app.get("/", async (req, res) => {
    res.status(200).send("Hello JeDer");
  });

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(5000, ()=>{
      console.log('Server is running...');
  });
  
  } catch (error) {
    console.log(error);
  }
}
  
start();