const router = require('koa-router')();

const saveNewUser = require('./saveNewUser');
const login = require('./login');
const authFromToken = require('./authFromToken');
const getUsers = require('./getUsers');
const deleteUser = require('./deleteUser');
const updateUser = require('./updateUser');
const saveUserImage = require('./saveUserImage');

router.prefix('/api');

router.post('/saveNewUser', saveNewUser);
router.post('/login', login);
router.post('/authFromToken', authFromToken);
router.post('/saveUserImage/:id', saveUserImage);

router.get('/getUsers', getUsers);

router.delete('/deleteUser/:id', deleteUser);

router.put('/updateUser/:id', updateUser);

module.exports = router;
