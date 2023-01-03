const express = require('express');
const router = express.Router();

const profilesControllers = require('../app/controllers/ProfilesControllers');

router.get('/', profilesControllers.index);

module.exports = router;
