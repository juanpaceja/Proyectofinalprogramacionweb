const express = require('express');

const router = express.Router();

const estudiantesController = require('../controller/estudiantescontroller.js');

router.get('/estudiantes', estudiantesController.getStudents);
router.post('/estudiantes', estudiantesController.createStudent);
router.put('/estudiantes/:id', estudiantesController.updateStudent);
router.delete('/estudiantes/:id', estudiantesController.deleteStudent);

router.post('/login/alumno', estudiantesController.loginAlumno);


module.exports = router;

