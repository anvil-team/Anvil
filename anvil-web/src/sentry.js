/*
 * @Author: zhenglfsir@gmail.com
 * @Date: 2019-01-16 22:00:06
 * @Last Modified by: zhenglfsir@gmail.com
 * @Last Modified time: 2019-02-28 13:13:48
 * sentry 监控入口文件
 */

import * as Sentry from '@sentry/browser';
import isDev from 'utils/isDev';

Sentry.init({
  enabled: isDev(),
  dsn: 'https://b536efe281744507a6cc5458dc77e099@sentry.luoyangfu.com/2',
  integrations: [
    new Sentry.Integrations.GlobalHandlers({ onerror: true, onunhandledrejection: true }),
    new Sentry.Integrations.UserAgent(),
  ],
  release: process.env.VERSION,
  environment: process.env.NODE_ENV,
});

Sentry.configureScope((scope) => {
  scope.setUser({ email: 'zhenglfsir@gmail.com' });
});
