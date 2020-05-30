const express = require('express');
const studentController = require('../controllers/student')
const { body } = require('express-validator');
const path = require('path');


/*const routes = express.Router();


routes.get('/', studentController.getIndex);
//routes.get('/create-student', studentController.getCreateStudent);

module.exports = routes;*/

const router = express.Router();
 
router.get('/', studentController.getIndext);
router.get('/create-student', studentController.getCreateStudent);

router.post('/create-student', studentController.postCreateStudent);

router.get('/student', studentController.getStudent);

router.get('/delete-student', studentController.getdeletestudent);

router.post('/delete-student', studentController.deleteStudent);

router.get('/update-student', studentController.getupdatestudent);

router.patch('/update-student', studentController.updatestudent);

module.exports = router;