const asyncHandler= require("express-async-handler")
const {body, validationResult}=  require("express-validator")
const User=  require("../models/user")
const bcrypt= require("bcryptjs")


exports.signup_form=  (req,res)=>{
   res.render("signup-form")
}  
exports.adding_user=
 [
     // Validation and sanitization
     body('firstname').trim().notEmpty().withMessage('First name is required.'),
     body('lastname').trim().notEmpty().withMessage('Last name is required.'),
     body('email').isEmail().withMessage('Enter a valid email address.').normalizeEmail(),
     body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long.'),
     body('confirmPassword').custom((value, { req }) => {
         if (value !== req.body.password) {
             throw new Error('Password confirmation does not match password.');
         }
         return true;
}),
  asyncHandler(async (req,res,next)=>{
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
       if(err){
          next(err)
         
       } else{
        const user= new User({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            password: hashedPassword
            
        })
        const errors= validationResult(req)
        if(!errors.isEmpty()){
         // there are errors
       res.render("signup-form",{user,errors:errors.array()} )
        }else{
            //the data is valid
            //check whether the user already exists  in the database
            const IsUserExist= await User.find({email:req.body.email}).exec()
            if(IsUserExist){
                res.render("signup-form", {message:"user already exist"})
            } else{
                // there is no existing user, so update the database 
                await user.save()
                res.redirect("/")
            }
        }
       }
     
       
    })
    
    
   
   })   
 ]
