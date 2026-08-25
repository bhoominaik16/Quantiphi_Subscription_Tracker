const express = require('express');
const router = express.Router();
const {
  getSubscriptions,
  createSubscription,
  toggleSubscriptionStatus,
  deleteSubscription
} = require('../controllers/subscriptionController');

router.route('/')
  .get(getSubscriptions)
  .post(createSubscription);

router.route('/:id/toggle-status')
  .patch(toggleSubscriptionStatus);

router.route('/:id')
  .delete(deleteSubscription);

module.exports = router;