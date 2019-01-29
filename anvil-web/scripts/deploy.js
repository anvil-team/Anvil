const http = require('http');

console.log('---------------------------------------');

const req = http.request('http://39.105.38.144:3333/restart', {
  method: 'GET',
});

req.end();

console.log('------------------------------------');
