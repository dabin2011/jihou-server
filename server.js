const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // ← これが静的ファイル配信

let promoMessages = [];

app.post('/promo', (req, res) => {
  const { text } = req.body;
  if (text && typeof text === 'string') {
    promoMessages.push(text.trim());
    res.json({ status: 'ok' });
  } else {
    res.status(400).json({ error: 'Invalid text' });
  }
});

app.get('/promo', (req, res) => {
  res.json({ messages: promoMessages });
});

app.listen(port, () => {
  console.log(`✅ サーバー起動中 http://localhost:${port}`);
});
