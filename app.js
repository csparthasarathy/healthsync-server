const express=require("express");
const mongoose=require('mongoose');
const app = express();
const doctorroute= require('./api/routes/doctor');
const patientroute=require('./api/routes/patient');
const adddoctorroute=require('./api/routes/adddoctor');
const deldoctorroute=require('./api/routes/deletedoctor');
const bodyparser=require('body-parser');

const cors = require('cors');
const morgan = require('morgan');
mongoose.connect('mongodb+srv://healthsync:databaseuser@healthsync.tzxj27h.mongodb.net/?retryWrites=true&w=majority&appName=healthsync');

mongoose.connection.on('error',err=>{
    console.log("database is not connected")
});

mongoose.connection.on('connected',connected=>{
    console.log("Connected with database")
});


app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use(cors());
app.use(morgan('dev'));

//url exists
app.use('/doctor',doctorroute);
app.use('/patient',patientroute);
app.use('/adddoctor',adddoctorroute);
app.use('/deldoctor',deldoctorroute);

//url not exists
app.use((req,res,next)=>{
    res.status(404).json({
        error:"URL not found"
    })
})

module.exports=app;