const enableBtn = document.getElementById('enable-audio');
const disableBtn = document.getElementById('disable-audio');

const videos = {
  "0:0": document.getElementById('jihou-video-0'),
  "12:0": document.getElementById('jihou-video-12'),
  "14:0": document.getElementById('jihou-video-14')
};

const audios = {
  "23:00": document.getElementById('jihou-audio-0'),
  "12:0": document.getElementById('jihou-audio-12'),
  "14:0": document.getElementById('jihou-audio-14')
};

let alreadyPlayed = false;

// 音声切り替え
enableBtn.addEventListener('click', () => {
  localStorage.setItem('jihou-status', 'enabled');
  enableBtn.style.display = 'none';
  disableBtn.style.display = 'inline-block';
});

disableBtn.addEventListener('click', () => {
  localStorage.setItem('jihou-status', 'disabled');
  disableBtn.style.display = 'none';
  enableBtn.style.display = 'inline-block';
});

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

// 時報チェック
setInterval(() => {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const key = `${h}:${m}`;

  const isEnabled = localStorage.getItem('jihou-status') === 'enabled';
  const isJihouTime = isEnabled && key in videos;

  if (isJihouTime && !alreadyPlayed) {
    alreadyPlayed = true;
    triggerJihou(videos[key], audios[key]);
  }

  if (!isJihouTime) {
    alreadyPlayed = false;
  }
}, 1000);

// 時報再生
function triggerJihou(video, audio) {
  enableBtn.style.display = 'none';
  disableBtn.style.display = 'none';

  video.currentTime = 0;
  audio.currentTime = 0;
  video.style.display = 'block';

  video.play().catch(err => console.error('映像再生失敗:', err));
  audio.play().catch(err => console.error('音声再生失敗:', err));

  video.onended = () => {
    video.style.display = 'none';
    const savedState = localStorage.getItem('jihou-status');
    if (savedState === 'enabled') {
      disableBtn.style.display = 'inline-block';
    } else {
      enableBtn.style.display = 'inline-block';
    }
  };
}




