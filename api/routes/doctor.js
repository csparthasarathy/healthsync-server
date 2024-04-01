const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const doctordetails = require('../model/doctor');
const authcheck = require('../middleware/auth-check');
const patientdetails = require('../model/patient');

router.post('/signin', (req, res, next) => {
    doctordetails.find({ username: req.body.username })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(404).json({
                    message: 'User not Found'
                })


            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (!result) {
                    return res.status(404).json({
                        message: 'Your Password is Incorrect'
                    })


                }
                if (result) {
                    const token = jwt.sign({
                        username: user[0].username
                    },
                        'secret',
                        {
                            expiresIn: "24h"
                        }
                    );
                    res.status(200).json({
                        message: 'Success',
                        username: user[0].username,
                        token: token
                    })
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

//doc enters patient username and uniquecode to know data

router.get('/pdetails', authcheck, (req, res, next) => {
    patientdetails.findOne({ username: req.body.username, uniquecode: req.body.uniquecode })
        .exec()
        .then(patient => {
            if (!patient) {
                return res.status(500).json({ message: "Invalid Credentials" })
            }
            else {
                return res.status(200).json({ data: patient })
            }

        })
        .catch(err => {
            res.status(500).json({ error: err })
        })
}
)

router.put('/update/:id', authcheck, async (req, res, next) => {
    await patientdetails.findOneAndUpdate(({ _id: req.params.id }, {
        $set: {
            medicines: req.body.medicines,
            diseases: req.body.diseases
        }
    }))
        .then(result => {
            res.status(200).json({
                message: "Updated Successfully",
                QuestionnaireList: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router;