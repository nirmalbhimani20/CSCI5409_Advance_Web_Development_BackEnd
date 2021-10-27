const express = require('express');
var jwt = require("jsonwebtoken");
var config = require('../../config/key');
const Login = require('../model/login.model');
const router = express.Router();

router.post('/login',(req,res)=>{
    
    if (!req.body) {
        res.status(400).send({
            success : false,
            message: "Content can not be empty!"
        });
    }

    console.log("my request",req.body);

    const user = new Login({
        email: req.body.email,
        password: req.body.password,
    });

    Login.checkUser(user.email,(err,data)=>{
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User."
          });
        else if(data !=0){
            if(data.password==user.password){
                console.log(data);
                var token = jwt.sign({ id: data.id }, config.secret, {
                    expiresIn: 10800 // 3 hours
                  });
                
                res.status(200).json({
                    success : true,
                    message : "Logged IN",
                    data : {
                        id: data.id,
                        role:data.role,
                        token: token,
                    }
                });
            }
            else{
                res.status(500).json({
                    success : false,
                    message : "Password Incorrect",
                    data : null
                });
            }
        }else{
            res.status(500).json({
                success : false,
                message : "User Not Found",
                data : null
            });
        }
    }) 
});

module.exports = router;