const express = require('express');

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
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

router.post('/signup', signup);

router.post('/login', login);

router.post('/forgotpassword', forgotPassword);

router.patch('/resetpassword/:token', resetPassword);

router.post('/updatepassword', protect, updatePassword);

router.patch('/updateme', protect, updateMe);

router.delete('/deleteme', protect, deleteMe);

router.route('/').get(getAllUsers).post(createUser);

router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
