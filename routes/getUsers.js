const User = require('../models/user');

module.exports = async ctx => {
  try {
    ctx.body = await User.find();
  } catch (err) {
    ctx.throw(err);
  }
};
