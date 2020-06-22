const express = require('express');
const {
  getAllReview,
  getReview,
  createReview,
  updateReview,
  deleteReview,
  setTourUsersIds,
} = require('../controllers/reviewController');

const { protect, restricTo } = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(protect);

router
  .route('/')
  .get(getAllReview)
  .post(restricTo('user'), setTourUsersIds, createReview);

router
  .route('/:id')
  .get(getReview)
  .patch(restricTo('user', 'admin'), updateReview)
  .delete(restricTo('user', 'admin'), deleteReview);

module.exports = router;
