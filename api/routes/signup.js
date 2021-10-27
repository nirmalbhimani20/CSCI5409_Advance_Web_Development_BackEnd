const express = require('express');
const User = require('../model/signup.model');

const router = express.Router();

router.post('/signup',(req,res)=>{
    
    if (!req.body) {
        res.status(400).send({
            success : false,
            message: "Content can not be empty!"
        });
    }

    const user = new User({
        email: req.body.email,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        active: req.body.active
    })

    console.log("my request",req.body);

    User.checkEmail(user.email,(err,data)=>{
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the User."
          });
        else if(data !=0){
            res.status(500).json({
                success : false,
                message : "User already Exists",
                data : data
            });
        }
        else{
            User.create(user, (err, data) => {
                if (err)
                  res.status(500).send({
                    message:
                      err.message || "Some error occurred while creating the User."
                });
                else res.status(200).json({
                    success : true,
                    message : "Signup Successful !! ",
                    data : data
                });
            });
        }
    })

    
})

module.exports = router;