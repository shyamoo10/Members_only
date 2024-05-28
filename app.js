const express=  require('express')
const db=  require("./dbConnection")
const app= express()
const router=  require("./routes/route")
const path=  require("path")
const passport = require("passport");
const { localStrategy, serializeUser, deserializeUser }=  require("./passport.conf")

const session = require("express-session");
 
app.set("views",path.join(__dirname, "views") )
app.set("view engine", "ejs")

app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.session());
passport.use(localStrategy)
passport.serializeUser(serializeUser)
passport.deserializeUser(deserializeUser)
app.use(express.json());  
app.use(router)    











app.listen(8000, ()=>{
    console.log("server started running at port 8000")
})