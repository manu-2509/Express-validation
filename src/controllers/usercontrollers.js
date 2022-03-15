const express = require('express');
const { body , validationResult} = require("express-validator")
const User = require('../models/usermodels')
const router = express.Router();

router.post("",
body("first_name")
.not()
.isEmpty()
.withMessage("First name is required"),
body("last_name")
.not()
.isEmpty()
.withMessage("Last name is required"),
body("email")
.isEmail()
.custom(async (value)=>{
    const user = await User.findOne({ email: value});
    if(user){
        throw new Error("Email is already in use")
    }
    return true;
}),
body("pincode")
.not()
.isEmpty()
.withMessage("Please enter your pincode")
.isNumeric()
.withMessage("Pincode must be a 6 digit number")
.custom((value)=>{
    if(value.length>6||value.length<6){
        throw new Error("Invalid pincode")
    }
    return true;
}),
body("age")
.not()
.isEmpty()
.withMessage("Please enter your age")
.isNumeric()
.withMessage("age is a number")
.custom((value)=>{
    if(value>=1||value<=100){
        throw new Error("Invalid age")
    }
    return true;
}),
body("gender")
.not()
.isEmpty()
.withMessage("Invalid. Select from following(Males,Females,Others)"),
async(req,res)=>{
try {
   const errors = validationResult(req);
   if(!errors.isEmpty()) {
return res.status(400).send({errors: errors.array()});
   }
   const user = await User.create(req.body)
   return res.status(201).send({user: user});
    
} catch (err) {
    return res.status(500).send({message: err.message});
}
})

module.exports = router;