import isDev from './utils/isDev';

if (!isDev() && 'serviceWorker' in navigator) {
  const log = (...args) => console.log.apply(null, ['[anvil]'].concat(args));
  navigator.serviceWorker
    .register('/sw.js', {
      scope: '/',
    })
    .then((registration) => {
      if (registration.installing) {
        log('sw installed');
      } else if (registration.waiting) {
        log('sw waiting');
      } else if (registration.active) {
        log('sw active');
      }
    })
    .catch((error) => {
      log('sw failed', error.message);
    });
}
