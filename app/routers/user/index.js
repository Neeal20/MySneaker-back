const express = require('express');
const userController = require('../../controllers/user/userController');
const middlewareAuth = require('../../middleware/auth/middlewareAuth');

const router = express.Router();

// route for login to a user account
router.post('/login', userController.login);

// route to create an account
router.post('/signup', userController.signup);

// route for account deletion
router.delete('/delete', middlewareAuth.isLogged, userController.delete);

// route to modify a profile
router.patch('/', middlewareAuth.isLogged, userController.modify);

// route to delete a profile (not definitive)
router.patch('/hidden', middlewareAuth.isLogged, userController.hideUser);

module.exports = router;
