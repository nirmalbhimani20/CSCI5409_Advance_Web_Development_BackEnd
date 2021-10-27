// Author: Dhrumil Rakesh Shah (B00870600)
const express = require('express');
var multer = require('multer');

// File upload settings  
const PATH = './uploads';
const expert = require('../../model/expert/expert.model');
const expertDetails = require('../../model/expert/expert.details');

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PATH);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

let upload = multer({
  storage: storage
});

const router = express.Router();

//course route
router.post('/addCourse', upload.single('file'), expert.addCourse)
router.get('/getCourses', expert.getCourses);
router.get('/getCourse/:courseId', expert.getCourse);
router.put('/updateCourse/:courseId', upload.single('file'), expert.updateCourse);
router.delete('/deleteCourse/:courseId', expert.deleteCourse);

//notes route
router.post("/uploadfiles", upload.single('file'), expert.addImageForQuillEditor)
router.post("/addNotes", expert.addNotes);
router.get("/getNotes", expert.getNotes);
router.get("/getNote/:noteId", expert.getNote);
router.delete("/deleteNote/:noteId", expert.deleteNote);

// faq routes
router.post("/addFAQ", expert.addFAQ);
router.get("/getFAQS", expert.getFAQs);
router.get("/getFAQ/:faqId", expert.getFAQ);
router.delete("/deleteFAQ/:faqId", expert.deleteFAQ);
router.put('/updateFAQ/:faqId', expert.updateFAQ);

// expert details routes
router.get('/getExpertDetails', expertDetails.getExpertDetails);

// expert user detail
router.get("/getUsers", expert.getUsers);
router.put("/activateUser/:userId", expert.activateUser);
router.put("/deactivateUser/:userId", expert.deactivateUser);
router.get("/userDetail/:userId" , expert.userDetail);

module.exports = router;
