const express = require('express');
const router = express.Router();

router.use('/user',require('./userRoutes/user'));
router.use('/to-do',require('./toDoRoutes/todo'));

module.exports = router;