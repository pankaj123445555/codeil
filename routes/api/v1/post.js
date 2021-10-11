const express = require('express');

const router = express.Router();

const post_api = require('../../../controllers/api/v1/post_api');

router.get('/',post_api.index);
module.exports = router;