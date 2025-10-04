const enableBtn = document.getElementById('enable-audio');
const disableBtn = document.getElementById('disable-audio');
const newsBar = document.getElementById('news-bar');
const newsText = document.getElementById('news-text');
const promoInput = document.getElementById('promo-input');
const promoDisplay = document.getElementById('promo-display');

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
  const savedPromo = localStorage.getItem('promo-text');
  if (savedPromo) {
    promoInput.value = savedPromo;
    promoDisplay.textContent = `📢 ${savedPromo}`;
  }
  fetchNewsOnly();
});

promoInput.addEventListener('input', () => {
  const text = promoInput.value;
  promoDisplay.textContent = `📢 ${text}`;
  localStorage.setItem('promo-text', text);
});

enableBtn.addEventListener('click', () => {
  enableBtn.style.display = 'none';
  disableBtn.style.display = 'inline-block';
  localStorage.setItem('jihou-status', 'enabled');
});

disableBtn.addEventListener('click', () => {
  disableBtn.style.display = 'none';
  enableBtn.style.display = 'inline-block';
  localStorage.setItem('jihou-status', 'disabled');
});

setInterval(() => {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const key = `${h}:${m}`;

  const isEnabled = localStorage.getItem('jihou-status') === 'enabled';
  const isJihouTime = isEnabled && key in videos;

  newsBar.style.display = isJihouTime ? 'none' : 'block';

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

// ✅ ニュースのみ取得
function fetchNewsOnly() {
  const newsAPI = "YOUR_NEWSAPI_KEY";
  fetch(`https://newsapi.org/v2/top-headlines?country=jp&language=ja&pageSize=5&apiKey=${newsAPI}`)
    .then(res => res.json())
    .then(data => {
      const headlines = data.articles.map(a => `📰 ${a.title}`).join('　');
      const promo = promoInput.value.trim();
      const promoText = promo ? `📢 ${promo}` : "";
      newsText.textContent = `${promoText}　${headlines}`;
    })
    .catch(err => {
      console.error("ニュース取得失敗:", err);
      newsText.textContent = "📰 ニュース取得に失敗しました";
    });
}

setInterval(fetchNewsOnly, 60000);
