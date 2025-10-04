const video = document.getElementById('jihou-video');
const enableBtn = document.getElementById('enable-audio');
const disableBtn = document.getElementById('disable-audio');

// 最初から時報ON（テスト用）
let jihouEnabled = true;
enableBtn.style.display = 'none';
disableBtn.style.display = 'inline-block';

// ボタン操作（本番用に戻すときに使う）
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

// 30秒後に動画再生（テスト用）
setTimeout(() => {
  if (jihouEnabled) {
    video.muted = false;
    video.volume = 1.0;
    video.style.display = 'block';
    video.play();
    console.log('✅ 動画を再生しました');
  }
}, 30000); // ← 30秒後
