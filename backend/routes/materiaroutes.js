const express = require('express');
const router = express.Router();

const MateriaController = require('../controller/materiacontroller.js');

router.get('/materia', MateriaController.getMateria);
router.post('/materia', (req, res, next) => {
  console.log('POST /api/materia recibida, body:', req.body);
  next();
}, MateriaController.createMateria);

router.put('/materia/:id', MateriaController.updateMateria);
router.delete('/materia/:id', MateriaController.deleteMateria);
router.get('/materia/carrera/:id', MateriaController.getByCarrera);
router.get('/materia/maestro/:id', MateriaController.getByMaestro);
router.get('/materias-con-carrera', MateriaController.getMateriasConCarrera);

module.exports = router;
