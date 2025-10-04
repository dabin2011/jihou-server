const enableBtn = document.getElementById('enable-audio');
const disableBtn = document.getElementById('disable-audio');
const newsText = document.getElementById('news-text');
const promoForm = document.getElementById('promo-form');
const promoInput = document.getElementById('promo-input');

const videos = {
  "0:0": document.getElementById('jihou-video-0'),
  "14:0": document.getElementById('jihou-video-14')
};

const audios = {
  "0:0": document.getElementById('jihou-audio-0'),
  "14:0": document.getElementById('jihou-audio-14')
};

let alreadyPlayed = false;

window.addEventListener('DOMContentLoaded', () => {
  fetchPromoMessages();
});

promoForm.addEventListener('submit', e => {
  e.preventDefault();
  const text = promoInput.value.trim();
  if (text) {
    fetch('http://localhost:3000/promo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    }).then(() => {
      promoInput.value = '';
    });
  }
});

setInterval(() => {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const key = `${h}:${m}`;

  const isEnabled = localStorage.getItem('jihou-status') === 'enabled';
  const isJihouTime = isEnabled && key in videos;

  document.getElementById('news-bar').style.display = isJihouTime ? 'none' : 'block';

  if (isJihouTime && !alreadyPlayed) {
    alreadyPlayed = true;
    triggerJihou(videos[key], audios[key]);
  }

  if (!isJihouTime) {
    alreadyPlayed = false;
  }
}, 1000);

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

function fetchPromoMessages() {
  fetch('http://localhost:3000/promo')
    .then(res => res.json())
    .then(data => {
      const messages = data.messages;
      if (messages.length > 0) {
        const random = messages[Math.floor(Math.random() * messages.length)];
        newsText.textContent = `📢 ${random}`;
      } else {
        newsText.textContent = '';
      }
    });
}

setInterval(fetchPromoMessages, 10000); // 10秒ごとにランダム更新
