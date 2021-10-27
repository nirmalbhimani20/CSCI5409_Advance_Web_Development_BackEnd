// Author: Dhrumil Rakesh Shah (B00870600)
const connection = require('../../../config/db');
var express = require('express');

module.exports = {
    getExpertDetails: (req, res) => {
        console.log("inside the getExpertDetails method");
        var sqlQuery = 'SELECT * FROM `expert`';
        connection.query(sqlQuery, (err, result) => {
            if (err) {
                res.status(500).send({
                    message:
                        "Error in fetching data"
                });
            }
            else {
                res.status(200).json({
                    success: true,
                    data: result
                });
            }
        })
    }
}