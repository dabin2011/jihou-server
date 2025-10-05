<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>シゲシゲ広告投稿</title>
  <style>
    body {
      margin: 0;
      font-family: sans-serif;
      background-color: black;
      color: white;
    }

    #ad-form-container {
      position: absolute;
      top: 10px;
      left: 10px;
      background-color: black;
      padding: 6px;
      z-index: 10;
    }

    #ad-form {
      display: flex;
      gap: 6px;
    }

    #ad-input {
      width: 160px;
      padding: 6px;
      font-size: 14px;
      border: none;
      border-radius: 4px;
    }

    #ad-form button {
      padding: 6px 12px;
      font-size: 14px;
      background-color: white;
      color: black;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    #status {
      margin-top: 8px;
      font-size: 12px;
      color: lightgreen;
    }
  </style>
</head>
<body>
  <div id="ad-form-container">
    <form id="ad-form">
      <input type="text" id="ad-input" placeholder="シゲシゲ広告" required />
      <button type="submit">投稿</button>
    </form>
    <div id="status"></div>
  </div>

  <script>
    const form = document.getElementById("ad-form");
    const input = document.getElementById("ad-input");
    const status = document.getElementById("status");

    form.addEventListener("submit", function(e) {
      e.preventDefault();
      const ad = input.value.trim();
      if (!ad) return;

      fetch("https://script.google.com/macros/s/AKfycbyo3Y4Gk-MEVgR2iSOZc2nEl0Nt5FXbCp4GeMRil3LzxznxEqWFEkymuQH9zwQA-iN8/exec", {
        method: "POST",
        body: JSON.stringify({ ad })
      })
      .then(res => res.text())
      .then(text => {
        status.textContent = "投稿が完了しました！";
        input.value = "";
      })
      .catch(err => {
        status.textContent = "投稿に失敗しました…";
        console.error(err);
      });
    });
  </script>
</body>
</html>
