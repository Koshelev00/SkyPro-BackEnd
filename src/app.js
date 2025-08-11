const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/users");
const bookRouter = require("./routes/books")
const loggerOne = require("./middlewares/loggerOne");
const loggerTwo = require("./middlewares/loggerTwo");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
dotenv.config();

const { 
  PORT = process.env.PORT || 3005,
   API_URL= "http://127.0.0.1",
   
  } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/test')
.then (function(){console.log('Conected')}).
catch(error => handleError(error));

const app = express();
app.get('/', (request, response) => {
  response.status(200);
  response.send('Hello, World!')
})

app.use(cors());
app.use(bodyParser.json());
app.use(loggerOne);
app.use(loggerTwo);

app.use(userRouter);
app.use(bookRouter)

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${API_URL}:${PORT}`);
});