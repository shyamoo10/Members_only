const express= require('express')
const mongoose= require('mongoose')
const router= express.Router()
const userController=  require("../controllers/user")

router.get("/", (req,res)=>  res.send("hello world") )
router.get("/signup",  userController.signup_form )
router.post("/signup", userController.adding_user)

module.exports =  router; 