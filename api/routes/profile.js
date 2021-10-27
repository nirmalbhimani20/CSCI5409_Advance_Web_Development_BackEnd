const express = require('express');
const Profile = require('../model/profile.model');
const router = express.Router();

router.get('/myprofile/:id',(req,res)=>{
    
    if (!req.body) {
        res.status(400).send({
            success : false,
            message: "Content can not be empty!"
        });
    }

    const user = new Profile({
        id: req.params.id
    });

    Profile.displayProfile(req.params.id,(err,data)=>{
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while displaying the User Profile."
          });

        if(data == null){
            return res.status(500).send({
                success: false,
                message:"User Not Found"
              });
        }else{
            return res.status(200).send({
                success: true,
                message:"Profile Obtained",
                data: data
              });
        }
    });
});

module.exports = router;