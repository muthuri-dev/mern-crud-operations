const express=require('express');
const cors=require('cors');
const mongoose=require('mongoose');
const multer= require('multer');
const bodyParser= require('body-parser');
const { application, response } = require('express');
const PORT=8000;

//initializing express
const app= express();

//middlewares
app.use(bodyParser.json());
app.use(cors());

//mongodb url
const mogoURL='mongodb://0.0.0.0/todo';

//database schema
const notes= require('./models/schema');

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

app.post('/notes',function(req,res){
    const newNote=new notes({
        note:req.body.note,
        details:req.body.details
    });
    newNote.save(
        function(err){
            if(!err){
                console.log({newNote});
            }else{
                console.log('post err: ',err);
            }
        }
    )
});

//getting the notes from the database
app.get('/notes',function(req,res){
    notes.find({}).sort({date:-1}).then(function(response){
        res.json({data:response});
    }).catch(function(err){
        console.log(err);
    });
});

//updating the note and the details in the database
app.patch('/notes/:id',function(req,res){
    const id=req.params._id;
    notes.findByIdAndUpdate({_id:id},req.body)
    .then(function(){
        console.log('Updated');
    })
});


//deleting a note from the database

app.delete('/notes/:id',async function(req,res){
   const id= req.params.id;
   notes.findByIdAndRemove(id,(err)=>{
    if(!err){
        console.log('deleted');
        res.json({
            mess:"deleted"
        });
    }else{
        console.log(err)
    }
   })
});