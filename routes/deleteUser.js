const User = require('../models/user');

module.exports = async ctx => {
  try {
    const user = await User.findOne({ _id: ctx.params.id });

    if (user) {
      await user.remove();
      ctx.body = user;
    } else {
      ctx.body = {
        error: {
          code: 404,
          message: 'User not found'
        }
      };
    }
  } catch (err) {
    ctx.throw(err);
  }
};
