const express = require('express');

const router = express.Router();

const adminController = require('../controller/admincontroller.js');

router.post('/login/admin', adminController.loginAdmin);
router.get('/admin/:id', adminController.getAdminById);

module.exports = router;