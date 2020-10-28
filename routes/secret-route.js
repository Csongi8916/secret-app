const express = require('express');
const { body } = require('express-validator/check');

const secretController = require('../controllers/secret-controller');

const router = express.Router();

// GET /api/secret/:id
router.get('/secret/:hash', secretController.getSecret);

//Just for test
// GET /api/secrets
//router.get('/secrets', secretController.getSecrets);

// POST /api/secret
router.post('/secret', secretController.createSecret);

module.exports = router;
