// server.js
const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`時報サイト起動中 http://localhost:${port}`);
});