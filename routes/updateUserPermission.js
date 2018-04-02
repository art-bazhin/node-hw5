const User = require('../models/user');

module.exports = async ctx => {
  const body = ctx.request.body;

  try {
    const user = await User.findOne({ _id: ctx.params.id });

    if (user) {
      let permission = { ...user.permission.toObject() };

      if (body.permission.news) {
        permission.news = { ...permission.news, ...body.permission.news };
      }

      if (body.permission.setting) {
        permission.setting = { ...permission.setting, ...body.permission.setting };
      }

      if (body.permission.chat) {
        permission.chat = { ...permission.chat, ...body.permission.chat };
      }

      console.log(permission);
      user.set('permission', permission);
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
