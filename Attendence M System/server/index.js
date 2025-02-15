const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');

const app = express()
app.use(cors())
app.use(express.json())


// for deployment center
const PORT = process.env.PORT || 8080


// schema
const schemaData = mongoose.Schema({
    name : String,
    email : String,
    mobile : String,
    log_In : String,
    log_Out : String,
    status : String
},{
    timestamps :true
})

const userModel = mongoose.model("user",schemaData)

// REAT DATA 
// ​http://localhost:8080/ 
app.get("/",async(req,res)=>{
    const data = await userModel.find({})

    res.json({success : true, data : data})
})

// create data API || save data in mongodb (POST)
// ​http://localhost:8080/delete/create 
/* 
{
    "name" : ,
    "email" : ,
    "mobile" : 
}
*/


app.post("/create", async(req, res)=>{
    console.log(req.body)
    const data = new userModel(req.body)
    await data.save()

    res.send({success : true, message : "data save successfully", data : data})
})


// UPDATE DATA 

// ​http://localhost:8080/update 


/*
    {
        id : "",
        name : "",
        mobile : ""
    }
*/

app.put("/update", async(req, res)=>{
    console.log(req.body)
    const {_id,...rest} = req.body

    console.log(rest)
    const data = await userModel.updateOne({_id : _id},rest)
    res.send({success : true, message : "data updated successufully", data : data})
})


// DELETE DATA 
// ​http://localhost:8080/delete/65f558ffba89c069770a78e5 

app.delete("/delete/:id", async(req, res)=>{
    const id = req.params.id
    console.log(id)
    const data = await userModel.deleteOne({_id : id})
    res.send({success : true, message : "data delete successfully", data : data})
})

mongoose.connect("mongodb://127.0.0.1:27017/employeeAttendece")
.then(()=>{
    console.log("connect to DB")
    app.listen(PORT,()=>console.log("Server is running"))
})
.catch((err)=>console.log(err))

