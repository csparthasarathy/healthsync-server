const express = require('express');
const router = express.Router();
const doctordetails = require('../model/doctor');
const mongoose=require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//send doc details with verifiers id

router.post('/', (req, res, next) => {
    if(req.body.vid==="healthsync"){
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        }
        
        if(req.body.username === '' || req.body.password === ''){
            return res.status(404).json({
                message: 'Username or Password cannot be empty'
            }) 
        }
        else {
            doctordetails.find({ username: req.body.username })
                .exec()
                .then(user => {
                    if (user.length < 1) {
                        const user = new doctordetails({
                            _id: new mongoose.Types.ObjectId,
                            name:req.body.name,
                            username: req.body.username,
                            password: hash,
                            phoneno:req.body.phoneno,
                            uniquecode:req.body.uniquecode
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
                        
                    }else{
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
    })}
    else{
        return res.status(500).json({message:"Inalid Verifiers Id"})
    }

})

module.exports = router;