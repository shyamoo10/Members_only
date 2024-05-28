const mongoose= require("mongoose")
const MessageSchema=  mongoose.Schema({
     title: String,
    text:String, 
    date:{type:Date, default:Date.now()}, 
    author:{type:mongoose.Types.ObjectId, ref:"User"}
})

const Message= mongoose.model("Message", MessageSchema)
module.exports=  Message
