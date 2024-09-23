const express= require("express")
const app = express()
app.use(express.json())
const mongoose= require("mongoose")
require('dotenv').config();

const userRouter = require("./routes/users")
app.use("/users",userRouter)

// product router
const productRouter = require("./routes/products")
app.use("/products", productRouter)

//Employee router for authentication and authorization

const employeeRouter = require("./routes/employees")
app.use("/employees",employeeRouter)


const initializeDbServer=()=>{
    app.listen(4000,()=>{
        console.log("app running successfully")
    })
    mongoose.set("strictQuery", false)
    mongoose.connect(process.env.DB_LINK,{useNewUrlParser:true})
    const db = mongoose.connection
    db.on("error",(error)=>console.log(error))
    db.once("open",()=>console.log("connected to Database"))
}

initializeDbServer();


