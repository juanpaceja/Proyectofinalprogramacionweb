const express = require('express');

const router = express.Router();

const periodoController = require('../controller/periodocontroller.js');

router.get('/periodo', periodoController.getPeriod);
router.post('/periodo', periodoController.createPeriod);
router.put('/periodo/:id', periodoController.updatePeriod);
router.delete('/periodo/:id', periodoController.deletePeriod);


module.exports = router;