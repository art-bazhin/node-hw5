const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: 'Username is required',
    unique: true
  },
  hash: {
    type: String,
    required: 'Password hash is required!'
  },
  firstName: { type: String, default: '' },
  surName: { type: String, default: '' },
  middleName: { type: String, default: '' },
  image: { type: String, default: '' },
  access_token: { type: String, default: null },
  permission: {
    chat: {
      C: { type: Boolean, default: false, required: true },
      D: { type: Boolean, default: false, required: true },
      R: { type: Boolean, default: true, required: true },
      U: { type: Boolean, default: true, required: true }
    },
    news: {
      C: { type: Boolean, default: false, required: true },
      D: { type: Boolean, default: false, required: true },
      R: { type: Boolean, default: true, required: true },
      U: { type: Boolean, default: false, required: true }
    },
    setting: {
      C: { type: Boolean, default: false, required: true },
      D: { type: Boolean, default: false, required: true },
      R: { type: Boolean, default: false, required: true },
      U: { type: Boolean, default: false, required: true }
    }
  }
}, {
  toObject: {
    transform: (doc, ret) => {
      ret.id = ret._id;
      ret.permissionId = ret._id;

      // front end requires it and I don't know why
      ret.access_token = 'token';

      delete ret._id;
      delete ret.__v;
      delete ret.hash;
    }
  }
});

module.exports = mongoose.model('user', userSchema);
