const mongoose= require('mongoose')
  const UserSchema= mongoose.Schema({
        firstname: String,
        lastname:String,
        email:{type:String},
        password : {type:String},
        membership_status:{type:String, default:"no"}
  })


  UserSchema.virtual("fullname").get(function(){
  const  Firstname=  (this.firstname)? this.firstname : "" 
     const Lastname=  (this.lastname)?  this.lastname  : ""

return   `${Firstname} ${Lastname}`

  })


  const User= mongoose.model("User", UserSchema)
  module.exports=  User