const express=  require('express')
const db=  require("./dbConnection")
const app= express()
const router=  require("./routes/route")
const path=  require("path")
 
app.set("views",path.join(__dirname, "views") )
app.set("view engine", "ejs")
app.use(router)











app.listen(3000, ()=>{
    console.log("server started running at port 3000")
})