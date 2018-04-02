const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  date: { type: String, required: true },
  text: { type: String, required: true },
  theme: { type: String, required: true },
  userId: { type: String, required: true }
}, {
  toObject: {
    transform: (doc, ret) => {
      ret.id = ret._id;

      delete ret._id;
      delete ret.__v;
    }
  }
});

module.exports = mongoose.model('news', userSchema);
