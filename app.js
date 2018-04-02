const path = require('path');

const Koa = require('koa');
const app = new Koa();
const json = require('koa-json');
const send = require('koa-send');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://root:password@ds141328.mlab.com:41328/portal');

const router = require('./routes/index');

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text'],
  extendTypes: {
    json: ['text/plain']
  }
}));
app.use(json());
app.use(logger());
app.use(require('koa-static')(path.join(__dirname, '/public')));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(router.routes(), router.allowedMethods());

// return index.html for all other routes
app.use(async ctx => {
  if (ctx.method === 'GET' && ctx.path.substr(0, 4) !== '/api') {
    await send(ctx, './public/index.html');
  }
});

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

module.exports = app;
