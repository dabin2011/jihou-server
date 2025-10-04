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
const current = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
const target = targetHour * 3600 + targetMinute * 60 + targetSecond;

if (jihouEnabled && Math.abs(current - target) <= 1) {
  video.muted = false;
  video.style.display = 'block';
  video.play();
}
}, 1000);




