const path = require('path');
const User = require('../models/user');

module.exports = async ctx => {
  const files = ctx.request.body.files;

  try {
    const user = await User.findOne({ _id: ctx.params.id });

    if (user && files) {
      ctx.body = {
        path: path.relative('public', files[ctx.params.id].path)
      };
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
