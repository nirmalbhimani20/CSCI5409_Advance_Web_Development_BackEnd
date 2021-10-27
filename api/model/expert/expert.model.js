const connection = require('../../../config/db');
var express = require('express');
var fs = require('fs');

module.exports = {

    addCourse: (req, res) => {
        console.log(" in add course method")

        var courseName = req.body.courseName;
        var courseDescription = req.body.courseDescription;
        var courseCredit = req.body.courseCredit;
        if (req.file) {
            var thumbnaiImageName = req.file.filename;
            if (courseName == null || courseName == "" || courseName == undefined) {
                fs.unlink('./uploads/' + thumbnaiImageName, function (err) {
                    if (err) {
                        res.status(500).send({
                            message:
                                "Course Name is null"
                        });
                    }
                })
            }
            else if (courseDescription == null || courseDescription == "" || courseDescription == undefined) {
                fs.unlink('./uploads/' + thumbnaiImageName, function (err) {
                    if (err) {
                        res.status(500).send({
                            message:
                                "Course Decription is null"
                        });
                    }
                })
            }
            else if (courseCredit == null || courseCredit == "" || courseCredit == undefined) {
                fs.unlink('./uploads/' + thumbnaiImageName, function (err) {
                    if (err) {
                        res.status(500).send({
                            message:
                                "Course Credit is null"
                        });
                    }
                })
            }
            else if (thumbnaiImageName == null || thumbnaiImageName == "" || thumbnaiImageName == undefined) {
                fs.unlink('./uploads/' + thumbnaiImageName, function (err) {
                    if (err) {
                        res.status(500).send({
                            message:
                                "Error"
                        });
                    }
                })
            }
            else {
                var sqlQuery34 = "SELECT * FROM `course` WHERE courseName = '" + courseName + "'";
                connection.query(sqlQuery34, (err, result) => {
                    if (err) {
                        res.status(500).send({
                            message:
                                "Error in fetching data"
                        });
                    }
                    else {
                        if (result.length >= 1) {
                            res.status(200).json({
                                success: false,
                                data: "duplicateentry"
                            });
                        }
                        else {
                            var sqlQuery = "INSERT INTO `course` ( `courseName`, `courseDescription`, `courseCredit` , `thumbnail`) VALUES ('" + courseName.trim() + "','" + courseDescription + "', '" + courseCredit + "', '" + thumbnaiImageName + "' )";
                            connection.query(sqlQuery, (err, result) => {
                                if (err) {
                                    fs.unlink('./uploads/' + thumbnaiImageName, function (err) {
                                        if (err) {
                                            res.status(500).send({
                                                message:
                                                    "Error"
                                            });
                                        }
                                    })
                                }
                                else {
                                    var sqlQuery12 = "SELECT * FROM `course` WHERE courseId = '" + result.insertId + "'";
                                    connection.query(sqlQuery12, (err, result) => {
                                        if (err) {
                                            res.status(500).send({
                                                message:
                                                    "Error Update"
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
                            })
                        }
                    }
                })
            }
        }
    },
    getCourses: (req, res) => {
        console.log(" in get  course method");
        var sqlQuery = "SELECT * FROM `course`";
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
    },
    getCourse: (req, res) => {
        console.log(" in  get course method");
        var courseId = req.params.courseId;
        var sqlQuery = "SELECT * FROM `course` WHERE courseId = '" + courseId + "'";
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
    },
    updateCourse: (req, res) => {
        console.log("in update course method");
        var courseId = req.params.courseId;
        var courseName = req.body.courseName;
        var courseDescription = req.body.courseDescription;
        var courseCredit = req.body.courseCredit;
        if (req.file) {
            var thumbnaiImageName = req.file.filename;
            var sqlQuery = "SELECT * FROM `course` WHERE courseId = '" + courseId + "'";
            connection.query(sqlQuery, (err, resultwithFile) => {
                if (err) {
                    res.status(500).send({
                        message:
                            "Error in fetching data"
                    });
                }
                else {
                    var sqlQuery34 = "SELECT * FROM `course` WHERE courseName = '" + courseName + "' AND courseId != '" + courseId + "'";
                    connection.query(sqlQuery34, (err, result) => {
                        if (err) {
                            res.status(500).send({
                                message:
                                    "Error in fetching data"
                            });
                        }
                        else {
                            if (result.length >= 1) {
                                res.status(200).json({
                                    success: false,
                                    data: "duplicateentry"
                                });
                            }
                            else {
                                fs.unlink('./uploads/' + resultwithFile[0].thumbnail, function (err) {
                                    if (err) {
                                        res.status(500).send({
                                            message:
                                                "Error in update"
                                        });
                                    }
                                    else {
                                        var sqlQuery = "UPDATE `course` SET  `courseName` = '" + courseName + "' , `courseDescription` = '" + courseDescription + "', `courseCredit` = '" + courseCredit + "', `thumbnail`= '" + thumbnaiImageName + "' WHERE courseId = '" + courseId + "'";
                                        connection.query(sqlQuery, (err, result) => {
                                            if (err) {
                                                res.status(500).send({
                                                    message:
                                                        "Error Update"
                                                });
                                            }
                                            else {
                                                var sqlQuery12 = "SELECT * FROM `course` WHERE courseId = '" + courseId + "'";
                                                connection.query(sqlQuery12, (err, result) => {
                                                    if (err) {
                                                        res.status(500).send({
                                                            message:
                                                                "Error Update"
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
                                        })
                                    }
                                })
                            }
                        }
                    })
                }
            })
        }
        else {
            var sqlQuery34 = "SELECT * FROM `course` WHERE courseName = '" + courseName.trim() + "' AND courseId != '" + courseId + "'";
            connection.query(sqlQuery34, (err, result) => {
                if (err) {
                    res.status(500).send({
                        message:
                            "Error in fetching data"
                    });
                }
                else {
                    if (result.length >= 1) {
                        console.log("111");
                        res.status(200).json({
                            success: false,
                            data: "duplicateentry"
                        });
                    }
                    else {
                        var sqlQuery789 = "UPDATE `course` SET  `courseName` = '" + courseName.trim() + "' , `courseDescription` = '" + courseDescription + "', `courseCredit` = '" + courseCredit + "' WHERE courseId = '" + courseId + "'";
                        connection.query(sqlQuery789, (err, result) => {
                            if (err) {
                                res.status(500).send({
                                    message:
                                        "Error Update"
                                });
                            }
                            else {
                                var sqlQuery12 = "SELECT * FROM `course` WHERE courseId = '" + courseId + "'";
                                connection.query(sqlQuery12, (err, result) => {
                                    if (err) {
                                        res.status(500).send({
                                            message:
                                                "Error Update"
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
                        })
                    }
                }
            })
        }
    },
    deleteCourse: (req, res) => {
        var courseId = req.params.courseId;
        var sqlQuery = "SELECT * FROM `course` WHERE courseId = '" + courseId + "'";
        connection.query(sqlQuery, (err, result) => {
            if (err) {
                res.status(500).send({
                    message:
                        "Error in fetching data"
                });
            }
            else {
                fs.unlink('./uploads/' + result[0].thumbnail, function (err) {
                    if (err) {
                        res.status(500).send({
                            message:
                                "Error in update"
                        });
                    }
                    else {
                        var sqlQuery = "DELETE  FROM `course` WHERE courseId= '" + courseId + "'";
                        connection.query(sqlQuery, (err, result) => {
                            if (err) {
                                res.status(500).send({
                                    message:
                                        "Error in deleting data"
                                });
                            }
                            else {
                                res.status(200).json({
                                    success: true,
                                });
                            }
                        })
                    }
                })
            }
        })
    },
    addImageForQuillEditor: (req, res) => {
        console.log("in add image for quill editor file");
        if (req.file) {
            var fileName = req.file.filename;
            res.req.file.path
            return res.json({ success: true, url: "https://csci-5709-nodejs.herokuapp.com/", fileName: fileName });
        }
    },
    addNotes: (req, res) => {
        console.log("in add notes method");
        var content = req.body.content;
        var courseId = req.body.courseId;
        var notesName = req.body.notesName;
        var notesTitle = req.body.notesTitle;
        var notesReference = req.body.notesReference;
        var sqlQuery34 = "Insert INTO `notes` (courseId , notesName, notesTitle , content , notesReference ) VALUES ('" + courseId + "' , '" + notesName + "' , '" + notesTitle + "' , '" + content + "', '" + notesReference + "' ) ";
        connection.query(sqlQuery34, (err, result) => {
            if (err) {
                console.log("err" + err);
                res.status(500).send({
                    message:
                        "Error In Insert"
                });
            }
            else {
                var sqlQuery12 = "SELECT * FROM `notes` as a  LEFT JOIN `course` as b ON  a.courseId = b.courseId where a.idnotes ='" + result.insertId + "'";
                connection.query(sqlQuery12, (err, fetchData) => {
                    if (err) {
                        res.status(500).send({
                            message:
                                "Error In Insertion"
                        });
                    }
                    else {
                        res.status(200).json({
                            success: true,
                            data: fetchData
                        });
                    }
                })
            }
        })
    },
    getNotes: (req, res) => {
        console.log(" in get all notes method");
        var sqlQuery = "SELECT * FROM `notes` as a  LEFT JOIN `course` as b ON  a.courseId = b.courseId;";
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
    },
    getNote: (req, res) => {
        console.log(" in get note method");
        var noteId = req.params.noteId;
        var sqlQuery = "SELECT * FROM `notes` as a  LEFT JOIN `course` as b ON  a.courseId = b.courseId where a.idnotes ='" + noteId + "'";
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
    },
    deleteNote: (req, res) => {
        console.log("in delete Notes method");
        var noteId = req.params.noteId;
        var sqlQuery = "DELETE  FROM `notes` WHERE idnotes= '" + noteId + "'";
        connection.query(sqlQuery, (err, result) => {
            if (err) {
                res.status(500).send({
                    message:
                        "Error in deleting data"
                });
            }
            else {
                res.status(200).json({
                    success: true,
                });
            }
        })
    },
    addFAQ: (req, res) => {
        console.log("in add faq method");
        var question = req.body.question;
        var answer = req.body.answer;
        var sqlQuery34 = "Insert INTO `faq` (question , answer) VALUES ('" + question + "' , '" + answer + "' ) ";
        connection.query(sqlQuery34, (err, result) => {
            if (err) {
                console.log("err" + err);
                res.status(500).send({
                    message:
                        "Error In Insert"
                });
            }
            else {
                var sqlQuery12 = "SELECT * FROM `faq` WHERE idfaq = '" + result.insertId + "'";
                connection.query(sqlQuery12, (err, fetchData) => {
                    if (err) {
                        console.log("err" + err);
                        res.status(500).send({
                            message:
                                "Error In Insertion"
                        });
                    }
                    else {
                        res.status(200).json({
                            success: true,
                            data: fetchData
                        });
                    }
                })
            }
        })
    },
    getFAQs: (req, res) => {
        console.log("in get faqs method");
        var sqlQuery = "SELECT * FROM `faq` ";
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
    },
    getFAQ: (req, res) => {
        console.log("in get faq method");
        var idfaq = req.params.faqId;
        var sqlQuery = "SELECT * FROM `faq`  where idfaq ='" + idfaq + "'";
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
    },
    deleteFAQ: (req, res) => {
        console.log(" in delete faq method");
        var faqId = req.params.faqId;
        var sqlQuery = "DELETE  FROM `faq` WHERE idfaq= '" + faqId + "'";
        connection.query(sqlQuery, (err, result) => {
            if (err) {
                res.status(500).send({
                    message:
                        "Error in deleting data"
                });
            }
            else {
                res.status(200).json({
                    success: true,
                });
            }
        })
    },
    updateFAQ: (req, res) => {
        console.log("in update FAQ ");
        var idfaq = req.params.faqId;
        var question = req.body.question;
        var answer = req.body.answer;
        var sqlQuery12 = "UPDATE `faq` SET  `question` = '" + question + "' , `answer` = '" + answer + "' WHERE idfaq = '" + idfaq + "'";
        connection.query(sqlQuery12, (err, result) => {
            if (err) {
                res.status(500).send({
                    message:
                        "Error Update"
                });
            }
            else {
                var sqlQuery13 = "SELECT * FROM `faq` WHERE idfaq = '" + idfaq + "'";
                connection.query(sqlQuery13, (err, result) => {
                    if (err) {
                        res.status(500).send({
                            message:
                                "Error Update"
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
        })

    },
    getUsers: (req, res) => {
        console.log(" in  get user list method");
        var sqlQuery = "SELECT * FROM `user`  where role != 2";
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
    },
    activateUser: (req, res) => {
        console.log(" in activate user");
        var id = req.params.userId;
        var sqlQuery = "Update `user` SET active = 1 where id = '" + id + "' ";
        connection.query(sqlQuery, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send({
                    message:
                        "Error in Updating data"
                });
            }
            else {
                var sqlQuery32 = "SELECT * FROM `user`  where id = '" + id + "'";
                connection.query(sqlQuery32, (err, result) => {
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
        })
    },
    deactivateUser: (req, res) => {
        console.log(" in deactivate user");
        var id = req.params.userId;
        var sqlQuery = "Update `user` SET active = 0 where id = '" + id + "' ";
        connection.query(sqlQuery, (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send({
                    message:
                        "Error in Updating data"
                });
            }
            else {
                var sqlQuery32 = "SELECT * FROM `user`  where id = '" + id + "'";
                connection.query(sqlQuery32, (err, result) => {
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
        })
    },
    userDetail: (req, res) => {
        console.log("in user detail method");

        var id = req.params.userId;
        var sqlQuery43 = "SELECT * FROM csci5709project.userinfo as a inner join csci5709project.user as b on  a.userId = b.id where b.id = '" + id + "'";
        connection.query(sqlQuery43, (err, userData) => {
            if (err) {
                res.status(500).send({
                    message:
                        "Error in fetching data"
                });
            }
            else {
                var sqlQuery44 = "SELECT * FROM csci5709project.usercourse where userId = '" + id + "';";
                connection.query(sqlQuery44, (err, courseData) => {
                    if (err) {
                        res.status(500).send({
                            message:
                                "Error in fetching data"
                        });
                    }
                    else {
                        var sqlQuery45 = "SELECT * FROM csci5709project.rating as a inner join csci5709project.course as b  on b.courseId = a.courseId where a.userId = '" + id + "' ;";
                        connection.query(sqlQuery45, (err, rating) => {
                            if (err) {
                                res.status(500).send({
                                    message:
                                        "Error in fetching data"
                                });
                            }
                            else {
                                res.status(200).json({
                                    success: true,
                                    userData: userData,
                                    courseData: courseData,
                                    rating: rating
                                });
                            }
                        })
                    }
                })

            }
        })
    }
}



