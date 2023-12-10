const https = require('https');
const url = require('url');
const next = require('next');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const options = {
    key: fs.readFileSync('./keys/privateKey.key'),
    cert: fs.readFileSync('./keys/certificate.crt'),
  };

  https.createServer(options, (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(4000, () => {
    console.log('> Server started on https://localhost:4000');
  });
});