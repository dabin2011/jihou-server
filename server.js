const express = require('express');
const path = require('path');
const app = express();

// publicフォルダーを静的ファイルとして提供
app.use(express.static('public'));

// ルートアクセスで index.html を返す
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Render用のポート設定
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
