const News = require('../models/news');

module.exports = async ctx => {
  const body = ctx.request.body;
  body.user = body.userId;

  try {
    if (body.text && body.theme) {
      const news = new News(body);
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
  } catch (err) {
    ctx.throw(err);
  }
};
