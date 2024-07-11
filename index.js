const express = require('express')
require("dotenv").config()

let app = express()

app.use(express.json())
let arr = []
let id = 0
let isdelete = false


app.get('/hello', (req, res) => 
    {
    try{
    res.redirect('/check')
    }


catch(err){
    res.status(500).send(err.message)}
})
    

app.get("/check", (req, res) => {
    try{
    res.send("<h1>check 111</h1>")
    }
    catch(err){
        res.status(500).send(err.message)
        }
})

app.put("/update", (req, res) => {
    try{
    res.send("update")
    console.log(req.query)}
    catch(err){
        res.status(500).send(err.message)
        }


})

app.post('/createprod', (req, res) => {
    try{
    let obj = req.body;
    obj.isdelete = false;
    id++;
    obj.id = id;

    if (obj.name && obj.cost && obj.category) {
        let a = arr.find((val) => {
            return val.name === obj.name
        })
        if (a == null) {
            arr.push(obj)
            res.status(201).send({ issucessfulz: true, product: obj })
        }
        else {
            res.send({ issucessfulz: false, msg: "not valid" })

        }

    }
    else {
        res.send({ issucessfulz: false, msg: "is not valid" })
    }
    }
    catch(err){
        res.status(500).send(err.message)
        }
})
app.put("/updateproduct", (req, res) => {
    let id = req.query.id
    let idx = arr.findIndex((val) => (val.id == id))
    if (idx >= 0) {
        let obj = arr[idx]
        obj = {
            ...obj,
            ...req.body
        }
        arr[idx] = obj
        res.status(200).send({ issuccess: true, updateVal: obj })
    }
    else {
        res.status(404).send({ issuccess: false, msg: "not valid" })
    }
})
app.delete("/deleteproduct", (req, res) => {
    try{
    let id = req.query.id
    let idx = arr.findIndex((val) => (val.id == id))
    if (idx >= 0) {
        arr.splice(idx, 1)
        res.status(200).send({ issuccess: true, deleteVal: arr })
    }
    else {
        res.status(404).send({ issuccess: false, msg: "not valid" })
    }}
    catch(err){
        res.status(500).send(err.message)
        }
})
app.delete("/deleteSoft", (req, res) => {
try{
    let id = req.query.id;
    let idx = arr.find((val) => (val.id == id));
    console.log(idx);
    if (idx && idx.isdelete == false) {
        idx.isdelete = true;
       res.status(200).send({ issuccessful: true, UpdatedProduct: arr })

    }
    else {
       res.status(404). send({ issuccessful: false, msg: "Product not find", isdeleted: false })
    }}
    catch(err){
        res.status(500).send(err.message)
        }

})

// app.delete("/softdelete", (req, res) => {
//     let id = req.query.id
//     let idx = arr.find((val) => (val.id == id))
//     console.log(idx)
//     if (idx && idx.isdelete == false) {
//         idx.isdelete == true
//         // arr[idx].isdelete=false
//         res.send({ issuccess: true, deleteVal: arr })
//     }
//     else {
//         res.send({ issuccess: false, msg: "not valid", isdelete: false })
//     }
// })
app.get('/filter',(req,res)=>{
    let obj =arr.filter((val)=>{ 
        return val.cost >500 && val.cost <1000

    })
    if(obj.cost >=500 && obj.cost<=1000)
        res.send({issuccess:true,filter:obj})

    else
    res.send({issuccess:false,msg:"not valid",filter:obj})

})

app.get('/sort',(req,res)=>{
    try{
        console.log("req",req.query)
        let sort1=req.query.sort;
        if(sort1=="asc"){
        let obj =arr.sort((a,b)=>{
             return a.cost-b.cost;
        })
        res.send({issuccess:true,sort:obj})

    }
        else if (sort1=="dsc"){
            let obj =arr.sort((a,b)=>{
               return  b.cost-a.cost
               
                })
                res.send({issuccess:true,sort:obj})
                    }
        }
        

    
    catch(err){
        res.send({issuccess:false,msg:"not valid",sort:obj})
        }
})

app.get('/all', (req, res) => {
    try{
    let ans = arr.filter((val) => {
        return val.isdelete == false
    })

    if (ans) {
        res.status(404).send({ product: ans })
    }
}
catch(err){
    res.status(500).send(err.message)
    }



})

app.listen((process.env.PORT), () => {
    console.log('Port started on 3000')
})

