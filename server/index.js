const request = require('request');
const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();
const fs = require('fs');

const API_PORT = 3001;
const API_KEY_CURRENCY = process.env.API_KEY_CURRENCY;
const CURRENCY_CONVERT_TO_EUR = process.env.CURRENCY_CONVERT_TO_EUR;
const CURRENCY_CONVERT_TO_USD = process.env.CURRENCY_CONVERT_TO_USD;
const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

router.get('/get-tickets', (req, res) => {
  fs.readFile('server/tickets.json', 'utf8', function(err, data) {
    if (err) throw err;
    res.send(data);
  });
});

router.get('/get-rates', function(req, res) {
  request.get(
    `http://free.currencyconverterapi.com/api/v5/convert?q=${CURRENCY_CONVERT_TO_EUR},${CURRENCY_CONVERT_TO_USD}&compact=ultra&apiKey=${API_KEY_CURRENCY}`,
    function(err, resp, body) {
      if (err) throw err;
      console.log(API_KEY_CURRENCY);
      res.send(body);
    },
  );
});

app.use('/api', router);

app.listen(API_PORT, () => console.log(`Express server is running on localhost:${API_PORT}`));
