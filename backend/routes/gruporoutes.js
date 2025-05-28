const express = require('express');

const router = express.Router();

const grupoController = require('../controller/grupocontroller.js');

router.get('/grupo', grupoController.getGroup);
router.post('/grupo', grupoController.createGroup);
router.put('/grupo/:id', grupoController.updateGroup);
router.delete('/grupo/:id', grupoController.deleteGroup);
router.get('/grupo/carrera', grupoController.getGruposPorCarrera);
router.get('/grupos/materia/:id', grupoController.getByMateria);
router.get('/profesor/:id', grupoController.getByProfesor);
router.get('/grupos/:id/alumnos', grupoController.getAlumnosByGrupo);
router.get('/grupos/:id/alumnos-calificaciones', grupoController.getAlumnosConCalificaciones);
router.put('/calificacion', grupoController.updateCalificacion);
router.get('/grupos-usuarios', grupoController.getGruposConAlumnos);
router.delete('/alumno-grupo/:id', grupoController.eliminarAlumnoDeGrupo);
router.put('/alumno-grupo/:id', grupoController.actualizarGrupoAlumno);




module.exports = router;