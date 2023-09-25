const express = require('express');
const routes = require('express').Router();
const bodyParser = require('body-parser')
const tours = require('./tours-simple.json');
const fs = require('fs');

const app = express();

app.use(bodyParser.json());
app.use(routes);

app.get('/api/v1/tours/:id',(req,res)=>{
    console.log(req.params);
    const id =  req.params.id * 1;
    const tour = tours.find(el => el.id === id);
    if(id > tours.length){
        return res.status(404).json({
            status: "false",
            message: "Invalid Id"
        })
    }

    res.status(200).json({
        data:{
            tours
        }
    })
})

app.post('/api/v1/tours',(req,res)=>{
    const newId = tours[tours.length-1].id + 1;
    const newTour = Object.assign({id: newId},req.body);

    tours.push(newTour);
    fs.writeFile('./tours-simple.json', JSON.stringify(tours), err=>{
        res.status(201).json({
            status:"success",
            data: {
                tours: newTour
            }
        });
    })

})

app.patch('/api/v1/tours/:id',(req,res)=>{
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: "false",
            message: "Invalid Id"
        })
    } 
        return res.status(200).json({
        status: "message",
        data:{
          tours  
        }
    });
});

app.delete('/api/v1/tours/:id',(req,res)=>{
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status: "false",
            message: "Invalid Id"
        })
    } else{
        res.status(204).json({
            status: "success",
            data:null
        });
    };


})


PORT = 3000;

app.listen(PORT,err =>{
    if (!err){
        return console.log("server started successfully");

    } else{

        console.log("error occured");
    }
});