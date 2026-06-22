const express = require("express");
const router = express.Router();
const authController = require("../../backend/controllers/authController");

const {
  processPayment,
  sendStripeAPI,
} = require("../../backend/controllers/paymentController");

router.route("/payment/process").post(authController.protect, processPayment);
router.route("/stripeapi").get(authController.protect, sendStripeAPI);

module.exports = router;
