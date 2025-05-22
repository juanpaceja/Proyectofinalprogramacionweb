const express = require('express');

const router = express.Router();

const calificacionController = require('../controller/calificacioncontroller.js');

router.get('/calificacion', calificacionController.getCalificacion);
router.post('/calificacion', calificacionController.createCalificacion);
router.put('/calificacion/:id', calificacionController.updateCalificacion);
router.delete('/calificacion/:id', calificacionController.deleteCalificacion);

router.get('/calificaciones/:id_alumno', calificacionController.getCalificacionesByAlumno);
router.get('/calificaciones/historial/:id_alumno', calificacionController.getHistorialCalificaciones);

router.get('/calificaciones/actual/:id_alumno', calificacionController.getCalificacionActual);

module.exports = router;