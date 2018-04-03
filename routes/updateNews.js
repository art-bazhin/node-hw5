const News = require('../models/news');

module.exports = async ctx => {
  const body = ctx.request.body;

  try {
    const news = await News.findOne({ _id: ctx.params.id });

    if (news) {
      if (body.text && body.theme) {
        news.set(body);
        await news.save();
        ctx.body = await News.find().populate('user');
      } else {
        ctx.body = {
          error: {
            code: 400,
            message: 'Text and theme fields are required'
          }
        };
      }
    } else {
      ctx.body = {
        error: {
          code: 404,
          message: 'News not found'
        }
      };
    }
  } catch (err) {
    ctx.throw(err);
  }
};
