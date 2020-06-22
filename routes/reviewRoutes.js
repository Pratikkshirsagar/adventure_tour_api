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

router
  .route('/')
  .get(getAllReview)
  .post(protect, restricTo('user'), setTourUsersIds, createReview);

router.route('/:id').get(getReview).patch(updateReview).delete(deleteReview);

module.exports = router;
