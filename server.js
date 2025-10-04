@@ -1,10 +1,17 @@
// server.js
const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// publicフォルダーを静的ファイルとして提供
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`時報サイト起動中 http://localhost:${port}`);
});
// ルートアクセスで index.html を返す
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Render用のポート設定
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
