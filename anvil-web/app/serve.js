/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2019-01-14 13:02:41
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2019-01-28 16:50:59
 * 实现代理请求以及渲染html
 */
import path from 'path';
import Koa from 'koa';
import httpProxy from 'http-proxy';
import koaStatic from 'koa-static';
import restart from './restart';

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
    await restart();
    return;
  }
  return await next();
});
app.use(koaStatic(staticPath, {}));

app.listen(port, () => {
  console.log('serve run on:', port);
});
