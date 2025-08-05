// route.js

const express = require('express');
const router = express.Router();
const { handleTextInput } = require('./controller');

router.post('/display-text', handleTextInput);

module.exports = router;