const express = require('express');
const router = express.Router();

const homeController = require('../controllers/homeController');

// *************************************************************************************** //
//                              Define the Routes                                         //
// *************************************************************************************** //

// Home Page
router.get('/', homeController.getHomePage);

module.exports = router;