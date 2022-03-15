const express = require('express');
const userController = require('./controllers/usercontrollers')
app=express();

app.use(express.json())


app.use("/user",userController)

module.exports=app