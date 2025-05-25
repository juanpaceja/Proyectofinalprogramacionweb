const express = require('express');

const router = express.Router();

const aprobadosController = require('../controller/aprobadoscontroller.js');

router.get('/aprobados', aprobadosController.getAprobados);
router.get('/reprobados', aprobadosController.getReprobados);
router.get('/reportes/aprobados', aprobadosController.generarPDFAlumnosAprobados);
router.get('/reportes/reprobados', aprobadosController.generarPDFAlumnosReprobados);

module.exports = router;