const User = require('../models/user');

module.exports = async ctx => {
  try {
    const user = await User.findOne({ _id: ctx.params.id });
    user.remove();
    ctx.body = user;
  } catch (err) {
    ctx.throw(err);
  }
};
