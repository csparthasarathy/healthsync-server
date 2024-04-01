const express = require('express');
const router = express.Router();
const patientdetails = require('../model/patient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


//to sign UP ask name,username,password,phoneno,uniquecode
//one route to add medicines n diseases
//other to upload prescriptions
//to sign IN only username and password

router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }

        if (req.body.username === '' || req.body.password === '') {
            return res.status(404).json({
                message: 'Username or Password cannot be empty'
            })
        }
        else {
            patientdetails.find({ username: req.body.username })
                .exec()
                .then(user => {
                    if (user.length < 1) {
                        const user = new patientdetails({
                            _id: new mongoose.Types.ObjectId,
                            name: req.body.name,
                            username: req.body.username,
                            password: hash,
                            phoneno: req.body.phoneno,
                            // medicines:req.body.medicines,
                            // diseases:req.body.diseases,
                            uniquecode: req.body.uniquecode
                        })
                        user.save()
                            .then(result => {
                                console.log(result);
                                res.status(200).json({
                                    User: result


                                })
                            })
                            .catch(err => {
                                console.log(err);
                                res.status(500).json({
                                    error: err
                                })
                            })

                    } else {
                        return res.status(404).json({
                            message: 'Username Already exists'
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    })
                })
        }
    })


})

router.post('/signin', (req, res, next) => {
    patientdetails.find({ username: req.body.username })
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

module.exports = router;
