const express = require('express');

const router = express.Router();

const MateriaController = require('../controller/materiacontroller.js');

router.get('/materia', MateriaController.getMateria);
router.post('/materia', MateriaController.createMateria);
router.put('/materia/:id', MateriaController.updateMateria);
router.delete('/materia/:id', MateriaController.deleteMateria);

router.get('/materia/carrera/:id', MateriaController.getByCarrera);
router.get('/materia/maestro/:id', MateriaController.getByMaestro);

module.exports = router;

