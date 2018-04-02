const router = require('koa-router')();
const saveNewUser = require('./saveNewUser');
const login = require('./login');
const authFromToken = require('./authFromToken');

router.prefix('/api');

router.post('/saveNewUser', saveNewUser);
router.post('/login', login);
router.post('/authFromToken', authFromToken);

module.exports = router;
