const express = require('express');

const router = express.Router();

const maestrosController = require('../controller/maestroscontroller.js');

router.get('/maestros', maestrosController.getTeachers);
router.post('/maestros', maestrosController.createTeachers);
router.put('/maestros/:id', maestrosController.updateTeachers);
router.delete('/maestros/:id', maestrosController.deleteTeachers);


module.exports = router;