const enableBtn = document.getElementById('enable-audio');
const disableBtn = document.getElementById('disable-audio');
const newsBar = document.getElementById('news-bar');
const newsText = document.getElementById('news-text');
const promoInput = document.getElementById('promo-input');
const promoDisplay = document.getElementById('promo-display');

const videos = {
  "11:59": document.getElementById('jihou-video-0'),
  "13:59": document.getElementById('jihou-video-14')
};

const audios = {
  "0:0": document.getElementById('jihou-audio-0'),
  "14:0": document.getElementById('jihou-audio-14')
};

let alreadyPlayed = false;

// 宣伝履歴の読み込み
window.addEventListener('DOMContentLoaded', () => {
  const savedPromo = localStorage.getItem('promo-text');
  if (savedPromo) {
    promoInput.value = savedPromo;
    promoDisplay.textContent = savedPromo;
  }
  fetchAllInfo();

  const savedState = localStorage.getItem('jihou-status');
  if (savedState === 'enabled') {
    enableBtn.style.display = 'none';
    disableBtn.style.display = 'inline-block';
  } else {
    enableBtn.style.display = 'inline-block';
    disableBtn.style.display = 'none';
  }
});

// 宣伝入力イベント＋保存
promoInput.addEventListener('input', () => {
  const text = promoInput.value;
  promoDisplay.textContent = text;
  localStorage.setItem('promo-text', text);
});

// 音声ON/OFF切り替え
enableBtn.addEventListener('click', () => {
  Object.values(audios).forEach(audio => {
    audio.muted = true;
    audio.play().then(() => {
      audio.pause();
      audio.currentTime = 0;
      audio.muted = false;
    }).catch(() => {});
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

// 時報チェック（0:00と14:00のみ）
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

// 時報発火（映像＋音声）
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

// ニュース・天気・地震情報の取得（毎分更新）
function fetchAllInfo() {
  const newsAPI = "YOUR_NEWSAPI_KEY";
  const weatherAPI = "YOUR_OPENWEATHER_KEY";
  const city = "Machida,jp";

  fetch(`https://newsapi.org/v2/top-headlines?country=jp&language=ja&pageSize=5&apiKey=${newsAPI}`)
    .then(res => res.json())
    .then(data => {
      const headlines = data.articles.map(a => `📰 ${a.title}`).join('　');

      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=ja&appid=${weatherAPI}`)
        .then(res => res.json())
        .then(weatherData => {
          const temp = Math.round(weatherData.main.temp);
          const desc = weatherData.weather[0].description;
          const weather = `☁️ 町田市の天気：${temp}°C、${desc}`;

          fetch("https://earthquake.tenki.jp/bousai/earthquake/")
            .then(res => res.text())
            .then(html => {
              const match = html.match(/最大震度[0-9].+?地震/);
              const quake = match ? `🌏 地震速報：${match[0]}` : "🌏 地震速報：最新情報取得中";
              newsText.textContent = `${headlines}　${weather}　${quake}`;
            });
        });
    })
    .catch(err => {
      console.error("情報取得失敗:", err);
      newsText.textContent = "📰 情報取得に失敗しました　☁️ 天気：取得中　🌏 地震：取得中";
    });
}

setInterval(fetchAllInfo, 60000);

