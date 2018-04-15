const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: {
      unique: true
    }
  },
  imageURL: {
    type: String,
  },
  DOB: {
    type: Date,
    required: true
  },
  budget: {
    type: Number
  },
  userId: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Contact', ContactSchema);
