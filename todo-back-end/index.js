const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const taskRouter = require('./Routes/taskRouter')
const userRouter = require('./Routes/userRouter')
const app = express();
app.use(cors());
app.use(express.json()) 

mongoose
  .connect("mongodb://localhost:27017/todo")
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));


app.use(userRouter)

app.use(taskRouter)





app.listen(8080, () => console.log("Listening to port 8080"));
