const predictRouter = require('./routes/predictionRouter');
const userRouter = require('./routes/userRouter');
const authCheck = require('./middleware/auth');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./db/connect');
require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 443;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cors({origin: true}));
app.use('/prediction', authCheck, predictRouter);
app.use('/user', userRouter);

app.get("/", async (req, res) => {
    res.status(200).send("Hello JeDer");
  });

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, ()=>{
      console.log('Server is running...');
  });
  
  } catch (error) {
    console.log(error);
  }
}
  
start();