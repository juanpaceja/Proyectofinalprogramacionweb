const express = require('express');

const router = express.Router();

const MateriaController = require('../controller/materiacontroller.js');

router.get('/materia', MateriaController.getMateria);
router.post('/materia', MateriaController.createMateria);
router.put('/materia/:id', MateriaController.updateMateria);
router.delete('/materia/:id', MateriaController.deleteMateria);


module.exports = router;

