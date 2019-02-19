const http = require('http');

const req = http.request('http://39.105.38.144:3333/restart', {
  method: 'GET',
});

req.end();
