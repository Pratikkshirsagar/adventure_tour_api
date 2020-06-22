const express = require('express');

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
} = require('../controllers/userController');

const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
} = require('../controllers/authController');

const { protect } = require('../controllers/authController');

const router = express.Router();

router.get('/me', protect, getMe, getUser);

router.post('/signup', signup);

router.post('/login', login);

router.post('/forgotpassword', forgotPassword);

router.patch('/resetpassword/:token', resetPassword);

router.use(protect);

router.post('/updatepassword', updatePassword);

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

router.patch('/updateme', updateMe);

router.delete('/deleteme', deleteMe);

module.exports = router;
