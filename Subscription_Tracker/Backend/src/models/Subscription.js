const mongoose = require('mongoose');

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Service name is required'],
      trim: true,
      maxlength: [100, 'Service name cannot exceed 100 characters']
    },
    cost: {
      type: Number,
      required: [true, 'Cost amount is required'],
      min: [0, 'Cost cannot be negative']
    },
    billingCycle: {
      type: String,
      required: [true, 'Billing cycle is required'],
      enum: {
        values: ['MONTHLY', 'YEARLY'],
        message: '{VALUE} is not a supported billing cycle'
      },
      default: 'MONTHLY'
    },
    nextRenewalDate: {
      type: Date,
      required: [true, 'Next renewal date is required']
    },
    status: {
      type: String,
      enum: ['ACTIVE', 'PAUSED'],
      default: 'ACTIVE'
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Subscription', subscriptionSchema);