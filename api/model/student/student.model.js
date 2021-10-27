const connection = require('../../../config/db');
var express = require('express');

module.exports = {
    getCourses: (req, res) => {
        console.log("getCourses called");
        var sql = "Select * from course";

        connection.query(sql, (err, result) => {
            if (err) {
                res.status(500).send({
                    message: "Error in loading courses"
                })
            }
            else {
                res.status(200).json({
                    success: true,
                    data: result
                })
            }
        })
    },

    getCoursesbyId: (req, res) => {
        console.log("getCoursesbyId called");
        var courseid = req.params.courseid;
        var sql = "Select * from course where courseid=" + courseid;
        connection.query(sql, (err, result) => {
            if (err) {
                res.status(500).send({
                    message: "Error in loading courses"
                })
            }
            else {
                res.status(200).json({
                    success: true,
                    data: result
                })
            }
        })
    },


    getCoursesbyTopic: (req, res) => {
        console.log("getCoursesbyTopic called");
        var topic = req.params.topic;
        var sql = "Select * from course where topic='" + topic + "'";
        connection.query(sql, (err, result) => {
            if (err) {
                res.status(500).send({
                    message: "Error in loading courses"
                })
            }
            else {
                res.status(200).json({
                    success: true,
                    data: result
                })
            }
        })
    },

    getUCourses: (req, res) => {
        console.log("getUCourses called");
        var userid = req.params.userid;
        var sql = "Select * from usercourse where userId=" + userid;
        connection.query(sql, (err, result) => {
            if (err) {
                res.status(500).send({
                    message: "Error in loading courses"
                })
            }
            else {
                res.status(200).json({
                    success: true,
                    data: result
                })
            }
        })

    },

    deleteCourse: (req, res) => {
        console.log("deleteCourse called");
        var ucid = req.params.ucid;
        var sql = "Delete from usercourse where ucId=" + ucid;
        connection.query(sql, (err, result) => {
            if (err) {
                res.status(500).send({
                    message: "Unable to delete the course"
                })
            }
            else {
                res.status(200).json({
                    success: true,
                })
            }
        })
    },

    getnotes: (req, res) => {
        console.log(" getnotes called");
        var courseid = req.params.courseid;
        var sql = "Select * from notes where courseid=" + courseid;
        connection.query(sql, (err, result) => {
            if (err) {
                res.status(500).send({
                    message: "Error in loading notes"
                })
            }
            else {
                res.status(200).json({
                    success: true,
                    data: result
                })
            }
        })
    },

    getfaq: (req, res) => {
        console.log(" getfaq called");
        var sql = " Select * from faq";
        connection.query(sql, (err, result) => {
            if (err) {
                res.status(500).send({
                    message: "Error in loading faq"
                })
            }
            else {
                res.status(200).json({
                    success: true,
                    data: result
                })
            }
        })
    },

    getvideos: (req, res) => {
        console.log("getvideos called");
        var courseid = req.params.courseid;
        var sql = "Select * from video where courseId=" + courseid;
        connection.query(sql, (err, result) => {
            if (err) {
                res.status(500).send({
                    message: "Error in loading videos"
                })
            }
            else {
                res.status(200).json({
                    success: true,
                    data: result
                })
            }
        })
    },

    getratings: (req, res) => {
        console.log(" getratings called");
        var courseid = req.params.courseid;
        var sql = "Select * from rating where courseid=" + courseid;
        connection.query(sql, (err, result) => {
            if (err) {
                res.status(500).send({
                    message: "Error in fetching the ratings"
                })
            }
            else {
                res.status(200).json({
                    success: true,
                    data: result
                })
            }
        })
    },

    getUratings: (req, res) => {
        console.log(" getUratings called");
        var userid = req.params.userid;
        var sql = "Select * from rating where userId=" + userid;
        connection.query(sql, (err, result) => {
            if (err) {
                res.status(500).send({
                    message: "Error in fetching the ratings"
                })
            }
            else {
                res.status(200).json({
                    success: true,
                    data: result
                })
            }
        })
    },

    getdetails: (req, res) => {
        console.log(" getdetails called");
        var courseid = req.params.courseid;
        var sql = "Select * from course where courseId=" + courseid;
        connection.query(sql, (err, result) => {
            if (err) {
                res.status(500).send({
                    message: "Error in fetching course details"
                })
            }
            else {
                res.status(200).json({
                    success: true,
                    data: result
                })
            }
        })
    },

    addrating: (req, res) => {
        console.log(" addrating called");
        var courseid = req.body.courseid;
        var rating = req.body.rating;
        var comment = req.body.comment;
        var userid = req.body.userid;
        var sql = "Insert into rating values ('" + courseid + "','" + rating + "', '" + comment  + "', '" + userid + "' )";

        connection.query(sql, (err, result) => {
            if (err) {
                res.status(500).send({
                    message: "Error in rating posting"
                })
            }
            else {
                res.status(200).json({
                    success: true,
                    data: result
                })
            }
        })
    },

    buycourse: (req, res) => {
        console.log(" buycourse called");
        var courseid = req.body.courseid;
        var userid = req.body.userid;
        var coursename = req.body.coursename;
        var image = req.body.image;
        var sql = "Insert into usercourse (courseId, userId, courseName, thumbnail) values ('" + courseid + "','" + userid + "', '" + coursename + "', '" + image + "' )";

        connection.query(sql, (err, result) => {
            if (err) {
                res.status(500).send({
                    message: "Error in buying course"
                })
            }
            else {
                res.status(200).json({
                    success: true,
                    data: result
                })
            }
        })
    }



}