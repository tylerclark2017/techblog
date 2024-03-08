const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api/index.js')

// Mount homeRoutes under the root path
router.use('/', homeRoutes);

router.use('/api', apiRoutes);

module.exports = router;