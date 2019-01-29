/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2019-01-14 13:02:41
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2019-01-29 15:05:12
 * 实现代理请求以及渲染html
 */
const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const httpProxy = require('http-proxy');
const koaStatic = require('koa-static');
const scripts = require('./scripts');

const app = new Koa();
const proxy = httpProxy.createProxyServer({
  target: 'http://39.105.38.144:8088',
  changeOrigin: true,
});
const port = process.env.U_PORT || 3003;
const staticPath = path.resolve(__dirname, './public');

app.use(async (ctx, next) => {
  if (ctx.url.startsWith('/api')) {
    ctx.respond = false;
    return proxy.web(ctx.req, ctx.res);
  }

  if (ctx.url.startsWith('/restart')) {
    try {
      console.log('start sync public...');
      await scripts.restart();
      ctx.body = 'deploy success.';
    } catch (error) {
      ctx.throw('deploy failed.', 403);
    }
    return;
  }

  if (ctx.url.startsWith('install')) {
    try {
      await scripts.install();
      ctx.body = 'installed success.';
    } catch (error) {
      ctx.throw('installed failed.', 403);
    }
  }
  return await next();
});
app.use(koaStatic(staticPath, {}));

app.use(async (ctx) => {
  ctx.body = fs.readFileSync(staticPath + '/index.html').toString();
});

app.listen(port, () => {
  console.log('serve run on:', port);
});
