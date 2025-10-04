const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/weather', async (req, res) => {
  try {
    const url = 'https://www.msn.com/ja-jp/weather/forecast/in-%E7%94%BA%E7%94%B0%E5%B8%82,%E6%9D%B1%E4%BA%AC%E9%83%BD';
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const temp = $('span.current').first().text().trim();
    const desc = $('span.weather-desc').first().text().trim();

    res.json({ temp, desc });
  } catch (err) {
    console.error('天気取得失敗:', err);
    res.status(500).json({ error: '天気取得失敗' });
  }
});

app.listen(3001, () => {
  console.log('✅ 天気サーバー起動中 http://localhost:3000');
});

