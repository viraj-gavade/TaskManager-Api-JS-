
const express = require("express")
const TaskRout = require("./routes/TaskRoutes")
const connectDB= require('./DataBase/connect')
const NotFound = require('./middleware/notfound')
const ErrorHandler = require("./middleware/ErrorHandler")
require('dotenv').config()
const app = express()
app.use(express.static('./public'))
 app.use(express.json())
 const port = process.env.PORT || 3000



app.use('/api/v1/tasks',TaskRout)

app.use('*',NotFound)
app.use(ErrorHandler)
const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI);
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log("Unable to Connect the server!");
    }
  };
  
  start();