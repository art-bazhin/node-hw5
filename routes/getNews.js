const News = require('../models/news');

module.exports = async ctx => {
  try {
    ctx.body = await News.find().populate('user');
  } catch (err) {
    ctx.throw(err);
  }
};
