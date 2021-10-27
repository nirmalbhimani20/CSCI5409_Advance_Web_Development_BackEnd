const express = require('express');
const student = require('../../model/student/student.model');
const router = express.Router();

//buyCourses
router.get('/getCourses',student.getCourses);
router.get('/getCourses/:courseid',student.getCoursesbyId);

//myCourses
router.get('/getUCourses/:userid',student.getUCourses);
router.delete('/deleteCourse/:ucid',student.deleteCourse);

//coursedetails
router.get('/getnotes/:courseid', student.getnotes);
router.get('/getfaq',student.getfaq);
router.get('/getvideos/:courseid',student.getvideos);
router.post('/addrating',student.addrating);


//buycoursedetails
router.get('/getdetails/:courseid',student.getdetails);
router.get('/getratings/:courseid',student.getratings);
router.get('/getUratings/:userid',student.getUratings);
router.post('/buycourse',student.buycourse);


module.exports = router;