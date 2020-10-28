const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const secretSchema = new Schema(
  {
    hash: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    },
    content: {
      type: Object,
      required: true
    },
    expire: {
      type: Date,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('secrets', secretSchema);
