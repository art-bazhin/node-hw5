const bcrypt = require('bcryptjs');
const uuid = require('uuid/v4');
const User = require('../models/user');

module.exports = async ctx => {
  const body = ctx.request.body;

  try {
    const user = await User.findOne({ username: body.username });

    if (user) {
      if (await bcrypt.compare(body.password, user.hash)) {
        let token;

        if (body.remembered) {
          token = uuid();
          user.set('access_token', token);

          await user.save();
          ctx.cookies.set('access_token', token,
            {
              httpOnly: false,
              expires: new Date(Date.now() + 5184000000)
            }
          );
        }

        ctx.body = user;
      } else {
        ctx.body = {
          error: {
            code: 401,
            message: 'Wrong password'
          }
        };
      }
    } else {
      ctx.body = {
        error: {
          code: 401,
          message: 'Wrong username'
        }
      };
    }
  } catch (err) {
    ctx.throw(err);
  }
};
