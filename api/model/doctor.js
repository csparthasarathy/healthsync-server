const mongoose=require('mongoose');

const doctorschema=new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    username:String,
    password:String,
    phoneno:Number,
    // hospitalname:String
    uniquecode:String
})

module.exports=mongoose.model('doctordetails',doctorschema);