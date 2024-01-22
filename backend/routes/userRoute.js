const express = require('express');
const router = express.Router();

const {
    useRegister,
    useLogin,
    getUser,
    deleteUser
} = require('../controllers/userController');


router.route('/register').post(useRegister);

router.route('/login').post(useLogin);

router.route('/user/:userId').get(getUser).delete(deleteUser);


module.exports = router;

