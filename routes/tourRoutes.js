const express = require('express');
const {
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopTour,
  getTourStats,
  getMonthlyPlan,
  getToursWithin,
  getDistances,
} = require('../controllers/tourController');
const reviewRouter = require('./reviewRoutes');

const { protect, restricTo } = require('../controllers/authController');

const router = express.Router();

router.use('/:tourId/reviews', reviewRouter);

router.route('/tour-stats').get(getTourStats);
router
  .route('/monthly-plan/:year')
  .get(protect, restricTo('admin', 'lead-guide', 'guide'), getMonthlyPlan);

router.route('/top-5-cheap').get(aliasTopTour, getAllTours);

router
  .route('/tour-within/:distance/center/:latlng/unit/:unit')
  .get(getToursWithin);

router.route('/distances/:latlng/unit/:unit').get(getDistances);

router
  .route('/')
  .get(getAllTours)
  .post(protect, restricTo('admin', 'lead-guide'), createTour);

router
  .route('/:id')
  .get(getTour)
  .patch(protect, restricTo('admin', 'lead-guide'), updateTour)
  .delete(protect, restricTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
