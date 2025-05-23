const express = require('express');

const router = express.Router();

const estudiantesController = require('../controller/estudiantescontroller.js');

router.get('/estudiantes', estudiantesController.getStudents);
router.post('/estudiantes', estudiantesController.createStudent);
router.put('/estudiantes/:id', estudiantesController.updateStudent);
router.delete('/estudiantes/:id', estudiantesController.deleteStudent);

router.post('/login/alumno', estudiantesController.loginAlumno);
router.get('/alumno/:id', estudiantesController.getAlumnoById);
// En estudiantesroutes.js
router.post('/estudiantes/grupo', estudiantesController.asignarGrupo);
router.get('/estudiantes/:id/grupos', estudiantesController.obtenerGruposAlumno);



module.exports = router;

