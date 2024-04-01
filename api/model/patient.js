const mongoose = require('mongoose');


const patientschema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    username: String,
    password: String,
    phoneno: Number,
    medicines: String,
    diseases: String,
    uniquecode: String,
    prescription: Buffer
})

module.exports = mongoose.model('patientdetails', patientschema);