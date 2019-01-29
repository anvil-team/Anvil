const http = require('http');

console.log('---------------------------------------');

const req = http.request(
  {
    method: 'GET',
    hostname: [39, 105, 38, 144],
    path: ['restart'],
    port: '3333',
  },
  (res) => {
    const chunks = [];

    res.on('data', (chunk) => {
      chunks.push(chunk);
    });

    res.on('end', () => {
      const data = Buffer.concat(chunks);
      console.log('deploy success.', data.toString());
    });
  }
);

req.end();

console.log('------------------------------------');
