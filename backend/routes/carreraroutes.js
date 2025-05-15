const express = require('express');

const router = express.Router();

const carreraController = require('../controller/carreracontroller.js');

router.get('/carrera', carreraController.getCarrera);
router.post('/carrera', carreraController.createCarrera);
router.put('/carrera/:id', carreraController.updateCarrera);
router.delete('/carrera/:id', carreraController.deleteCarrera);


module.exports = router;