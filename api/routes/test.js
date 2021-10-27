const express = require('express');
const { verifyToken } = require('../../middleware/authJWT');

const router = express.Router();

router.get('/jwt_testing',verifyToken,(req,res)=>{
        
    res.status(400).send({
            success : true,
            message: "JWT Tested!"
        });

});

module.exports = router;