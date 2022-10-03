const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const multer= require('multer');
const bodyParser= require('body-parser');
const { application } = require('express');
const PORT=8000;

//initializing express
const app= express();

//middlewares
app.use(bodyParser.json());
app.use(cors());

//mongodb url
const mogoURL='mongodb://0.0.0.0/todo';

//connectiong to the server and database
mongoose.connect(mogoURL)
.then(function(){
    app.listen(PORT,function(err){
        if(err){
            console.log(`Listening error: `,err);
        }else{
            console.log(`App connected on port ${PORT}`);
        }
    });
})
.catch(function(err){
    console.log('Mongo error: ',err);
});

//Application Routes

