const express = require('express');

const router = express.Router();

const estudiantesController = require('../controller/estudiantescontroller.js');

router.get('/estudiantes', estudiantesController.getStudents);

module.exports = router;