const video = document.getElementById('jihou-video');
const audio = document.getElementById('jihou-audio');
const enableBtn = document.getElementById('enable-audio');
const disableBtn = document.getElementById('disable-audio');

window.addEventListener('DOMContentLoaded', () => {
  const savedState = localStorage.getItem('jihou-status');
  if (savedState === 'enabled') {
    enableBtn.style.display = 'none';
    disableBtn.style.display = 'inline-block';
  } else {
    enableBtn.style.display = 'inline-block';
    disableBtn.style.display = 'none';
  }
});

enableBtn.addEventListener('click', () => {
  // 再生許可を得るために一瞬だけ無音再生
  audio.muted = true;
  audio.play().then(() => {
    audio.pause();
    audio.currentTime = 0;
    audio.muted = false;
    console.log('✅ 再生許可取得済み');
  }).catch((err) => {
    console.error('❌ 再生許可失敗:', err);
  });

  enableBtn.style.display = 'none';
  disableBtn.style.display = 'inline-block';
  localStorage.setItem('jihou-status', 'enabled');
});

disableBtn.addEventListener('click', () => {
  disableBtn.style.display = 'none';
  enableBtn.style.display = 'inline-block';
  localStorage.setItem('jihou-status', 'disabled');
});

// 時刻指定（例：02:35:00）
setInterval(() => {
  const now = new Date();
  if (
    now.getHours() === 2 &&
    now.getMinutes() === 35 &&
    now.getSeconds() === 0 &&
    localStorage.getItem('jihou-status') === 'enabled'
  ) {
    triggerJihou();
  }
}, 1000);

function triggerJihou() {
  video.currentTime = 0;
  audio.currentTime = 0;

  video.style.display = 'block';

  video.play().catch(err => console.error('❌ 映像再生失敗:', err));
  audio.play().then(() => {
    console.log('✅ 音声再生成功');
  }).catch(err => {
    console.error('❌ 音声再生失敗:', err);
  });
}
