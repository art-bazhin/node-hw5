const User = require('../models/user');
const bcrypt = require('bcryptjs');

module.exports = async ctx => {
  const body = ctx.request.body;

  try {
    const user = await User.findOne({ _id: ctx.params.id });

    if (user) {
      if (body.oldPassword && body.password) {
        if (await bcrypt.compare(body.oldPassword, user.hash)) {
          const salt = await bcrypt.genSalt(10);
          body.hash = await bcrypt.hash(body.password, salt);
        } else {
          ctx.body = {
            error: {
              code: 401,
              message: 'Wrong password'
            }
          };
          return;
        }
      }

      user.set(body);
      ctx.body = await user.save();
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
