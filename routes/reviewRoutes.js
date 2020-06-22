const express = require('express');
const {
  getAllReview,
  getReview,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');

const { protect, restricTo } = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getAllReview)
  .post(protect, restricTo('user'), createReview);

router.route('/:id').get(getReview).patch(updateReview).delete(deleteReview);

module.exports = router;
