const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// 静的ファイルを配信する
app.use(express.static(path.join(__dirname, 'public')));

// ルートアクセスで index.html を返す
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// サーバー起動
app.listen(PORT, () => {
  console.log(`✅ サーバー起動中 http://localhost:${PORT}`);
});
