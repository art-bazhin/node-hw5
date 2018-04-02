const User = require('../models/user');

module.exports = async ctx => {
  const token = ctx.request.body.access_token;

  try {
    const user = await User.findOne({ access_token: token });

    if (user) {
      ctx.body = user;
    } else {
      ctx.body = {
        error: {
          code: 401,
          message: 'Wrong token'
        }
      };
    }
  } catch (err) {
    ctx.throw(err);
  }
};
