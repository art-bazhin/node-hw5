const News = require('../models/news');

module.exports = async ctx => {
  const body = ctx.request.body;
  body.user = body.userId;

  try {
    const news = new News(body);
    await news.save();
    ctx.body = await News.find().populate('user');
  } catch (err) {
    ctx.throw(err);
  }
};
