const express = require('express');
const router = express.Router();

const apiController = require('../controllers/apiController');

// *************************************************************************************** //
//                              Define the Routes                                         //
// *************************************************************************************** //

// Get all database for couchdb
router.get('/all', apiController.getAll);

// Get twitter data
router.get('/twitter', apiController.getTwitter);

// Get mastodon data
router.get('/mastodon', apiController.getMastodon);



module.exports = router;