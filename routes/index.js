const router = require('koa-router')();
const saveNewUser = require('./saveNewUser');
const login = require('./login');
const authFromToken = require('./authFromToken');
const getUsers = require('./getUsers');
const deleteUser = require('./deleteUser');

router.prefix('/api');

router.post('/saveNewUser', saveNewUser);
router.post('/login', login);
router.post('/authFromToken', authFromToken);

router.get('/getUsers', getUsers);

router.delete('/deleteUser/:id', deleteUser);

module.exports = router;
