const mongoose= require('mongoose');
const schema= mongoose.Schema;
const noteSchema= new schema({
    note:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true
    }
},{timestamps:true});

const notes=mongoose.model('notes',noteSchema);
module.exports=notes;