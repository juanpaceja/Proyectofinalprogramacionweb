const express = require('express');

const router = express.Router();

const grupoController = require('../controller/grupocontroller.js');

router.get('/grupo', grupoController.getGroup);
router.post('/grupo', grupoController.createGroup);
router.put('/grupo/:id', grupoController.updateGroup);
router.delete('/grupo/:id', grupoController.deleteGroup);
router.get('/grupo/carrera', grupoController.getGruposPorCarrera);


module.exports = router;

