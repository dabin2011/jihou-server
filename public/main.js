const video = document.getElementById('jihou-video');
const enableBtn = document.getElementById('enable-audio');
const disableBtn = document.getElementById('disable-audio');

let jihouEnabled = false;

// ボタン操作で時報の有効/無効を切り替え
enableBtn.addEventListener('click', () => {
  jihouEnabled = true;
  enableBtn.style.display = 'none';
  disableBtn.style.display = 'inline-block';
});

disableBtn.addEventListener('click', () => {
  jihouEnabled = false;
  disableBtn.style.display = 'none';
  enableBtn.style.display = 'inline-block';
});

// 時報のターゲット時刻（00:40:39）
const targetHour = 0;
const targetMinute = 40;
const targetSecond = 39;

// 毎秒チェックして時報を鳴らす
setInterval(() => {
  const now = new Date();
  if (
    jihouEnabled &&
    now.getHours() === targetHour &&
    now.getMinutes() === targetMinute &&
    now.getSeconds() === targetSecond
  ) {
    video.muted = false; // 🔊 音をONにする
    video.play();
  }
}, 1000);



