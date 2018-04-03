const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const newsSchema = new mongoose.Schema({
  date: { type: String, required: true },
  text: { type: String, required: true },
  theme: { type: String, required: true },
  user: { type: ObjectId, ref: 'User' }
}, {
  toObject: {
    transform: (doc, ret) => {
      ret.id = ret._id;

      delete ret._id;
      delete ret.__v;
    }
  }
});

module.exports = mongoose.model('News', newsSchema);
