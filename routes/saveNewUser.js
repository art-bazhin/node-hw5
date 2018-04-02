const bcrypt = require('bcryptjs');
const User = require('../models/user');

module.exports = async ctx => {
  const body = ctx.request.body;

  try {
    if (await User.count({ username: body.username })) {
      ctx.body = {
        error: {
          code: 409,
          message: 'Username already exists'
        }
      };
    } else {
      let permission;

      // give all permissions to the first registred user
      if (await User.count() === 0) {
        permission = {
          chat: { C: true, R: true, U: true, D: true },
          news: { C: true, R: true, U: true, D: true },
          setting: { C: true, R: true, U: true, D: true }
        };
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(body.password, salt);

      const user = new User({
        username: body.username,
        hash: hash,
        firstName: body.firstName,
        surName: body.surName,
        middleName: body.middleName,
        permission: permission
      });

      ctx.body = await user.save();
    }
  } catch (err) {
    ctx.throw(err);
  }
};
