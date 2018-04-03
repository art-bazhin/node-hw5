const router = require('koa-router')();

const saveNewUser = require('./saveNewUser');
const login = require('./login');
const authFromToken = require('./authFromToken');
const getUsers = require('./getUsers');
const deleteUser = require('./deleteUser');
const updateUser = require('./updateUser');
const updateUserPermission = require('./updateUserPermission');
const saveUserImage = require('./saveUserImage');
const newNews = require('./newNews');
const getNews = require('./getNews');
const deleteNews = require('./deleteNews');
const updateNews = require('./updateNews');

router.prefix('/api');

router.post('/saveNewUser', saveNewUser);
router.post('/login', login);
router.post('/authFromToken', authFromToken);
router.post('/saveUserImage/:id', saveUserImage);
router.post('/newNews', newNews);

router.get('/getUsers', getUsers);
router.get('/getNews', getNews);

router.delete('/deleteUser/:id', deleteUser);
router.delete('/deleteNews/:id', deleteNews);

router.put('/updateUser/:id', updateUser);
router.put('/updateUserPermission/:id', updateUserPermission);
router.put('/updateNews/:id', updateNews);

module.exports = router;
