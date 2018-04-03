const News = require('../models/news');

module.exports = async ctx => {
  try {
    const news = await News.findOne({ _id: ctx.params.id });

    if (news) {
      await news.remove();
      ctx.body = await News.find().populate('user');
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
