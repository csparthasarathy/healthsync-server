const express = require('express');
const router = express.Router();
const doctordetails = require('../model/doctor');

//send doctors username and uniques id

router.delete('/', (req, res, next) => {
    const usertodelete = req.body.username;
    const validate = req.body.uniquecode;

    doctordetails.findOne(({username:usertodelete}))
        .then(result => {
           
            if (!result || validate !== result.uniquecode) {
                return res.status(404).json({ message: "Invalid details" });
            }
            
            return doctordetails.findOneAndDelete({username:usertodelete });
        })
        .then(deletedDoctor => {
            if (!deletedDoctor) {
                return res.status(404).json({ message: "Doctor not found" });
            }
            res.status(200).json({ message: 'Deleted Successfully' });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        });
});

module.exports = router;
