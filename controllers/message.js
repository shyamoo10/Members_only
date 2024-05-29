const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const Message=  require("../models/messge")
const User= require("../models/user")



exports.Homepage=  asyncHandler(async(req,res,next)=>{
    const messages = await Message.find({})
    .populate({
        path: 'author',
        match: { membership_status: 'Yes' }
    })
    .exec();
    const filteredMessages = messages.filter(message => message.author !== null);
     
    console.log(filteredMessages)
    res.render("homepage", {messages:filteredMessages})  
})
  
exports.createMessageForm= (req,res,next)=>{
    res.render("create-message-form")
}
    /// validation is required , but for simplicity i avoided that here 
    //   add message to database 
exports.createMessage=  asyncHandler(async(req,res,next)=>{
        const message=  new Message({
            title:req.body.title,
            text:req.body.message,
            author:req.user.id,
            date:Date.now()
        })

       await message.save()
       res.redirect("/")   
})