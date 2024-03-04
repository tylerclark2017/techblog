const router = require('express').Router();
const homeRoutes = require('./homeRoutes');

// Mount homeRoutes under the root path
router.use('/', homeRoutes);

module.exports = router;