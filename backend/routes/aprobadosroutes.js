const express = require('express');

const router = express.Router();

const aprobadosController = require('../controller/aprobadoscontroller.js');

router.get('/aprobados', aprobadosController.getAprobados);
router.get('/reprobados', aprobadosController.getReprobados);

module.exports = router;