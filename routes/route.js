const express= require('express')
const mongoose= require('mongoose')
const router= express.Router()
const userController=  require("../controllers/user")

  router.get("/", (req,res)=>{
    res.render("homepage")
  } )
router.get("/signup",  userController.signup_form )
router.post("/signup", userController.adding_user)
router.get("/ismember",userController.isMemberCheckPage)
router.post("/ismember",userController.isMemberCheckFunction)

module.exports =  router; 