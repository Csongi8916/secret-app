const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const secretSchema = new Schema(
  {
    hash: {
      type: String,
      required: true
    },
    secretText: {
      type: Object,
      required: true
    },
    expiresAt: {
      type: Date,
      required: true
    },
    remainingViews: {
      type: Number,
      required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('secrets', secretSchema);
