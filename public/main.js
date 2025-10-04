const video = document.getElementById('jihou-video');
const enableBtn = document.getElementById('enable-audio');
const disableBtn = document.getElementById('disable-audio');
const playBtn = document.getElementById('play-jihou');

let jihouEnabled = false;

// ボタン操作で時報の有効/無効を切り替え
enableBtn.addEventListener('click', () => {
  jihouEnabled = true;
  enableBtn.style.display = 'none';
  disableBtn.style.display = 'inline-block';

  // 再生許可を得るために一瞬だけ無音再生
  video.muted = true;
  video.play().then(() => {
    video.pause();
    video.currentTime = 0;
    video.muted = false;
    console.log('✅ 再生許可取得済み');
  }).catch((err) => {
    console.error('❌ 再生許可失敗:', err);
  });
});

disableBtn.addEventListener('click', () => {
  jihouEnabled = false;
  disableBtn.style.display = 'none';
  enableBtn.style.display = 'inline-block';
});

// 🔔 時報のターゲット時刻（ここを好きな時間に変更）
const targetHour = 1;
const targetMinute = 45;
const targetSecond = 0;

// 毎秒チェックして時報ボタンを表示
setInterval(() => {
  const now = new Date();
  const current = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
  const target = targetHour * 3600 + targetMinute * 60 + targetSecond;

  if (jihouEnabled && Math.abs(current - target) <= 1) {
    playBtn.style.display = 'inline-block';
  }
}, 1000);

// ユーザーが時報ボタンを押したら再生
playBtn.addEventListener('click', () => {
  video.currentTime = 0;
  video.muted = false;
  video.volume = 1.0;
  video.style.display = 'block';
  video.play().then(() => {
    console.log('✅ 時報再生成功');
    playBtn.style.display = 'none';
  }).catch((err) => {
    console.error('❌ 時報再生失敗:', err);
  });
});
