const video = document.getElementById('jihou-video');
const enableBtn = document.getElementById('enable-audio');
const disableBtn = document.getElementById('disable-audio');

window.addEventListener('DOMContentLoaded', () => {
  const savedState = localStorage.getItem('jihou-status');
  if (savedState === 'enabled') {
    video.muted = false;
    enableBtn.style.display = 'none';
    disableBtn.style.display = 'inline-block';
  } else {
    video.muted = true;
    enableBtn.style.display = 'inline-block';
    disableBtn.style.display = 'none';
  }
});

enableBtn.addEventListener('click', () => {
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

  enableBtn.style.display = 'none';
  disableBtn.style.display = 'inline-block';
  localStorage.setItem('jihou-status', 'enabled');
});

disableBtn.addEventListener('click', () => {
  video.muted = true;
  video.load();
  disableBtn.style.display = 'none';
  enableBtn.style.display = 'inline-block';
  localStorage.setItem('jihou-status', 'disabled');
});

setInterval(() => {
  const now = new Date();
  if (now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0) {
    triggerJihou();
  }
}, 1000);

function triggerJihou() {
  const savedState = localStorage.getItem('jihou-status');
  if (savedState !== 'enabled') return;

  enableBtn.style.display = 'none';
  disableBtn.style.display = 'none';

  video.currentTime = 0;
  video.muted = false;
  video.volume = 1.0;
  video.style.display = 'block';

  video.play().then(() => {
    console.log('✅ 時報再生成功');
  }).catch((err) => {
    console.error('❌ 時報再生失敗:', err);
  });

  video.onended = () => {
    if (savedState === 'enabled') {
      disableBtn.style.display = 'inline-block';
    } else {
      enableBtn.style.display = 'inline-block';
    }
  };
}
