@@ -1,50 +1,58 @@
const video = document.getElementById('jihou-video');
const audio = document.getElementById('jihou-audio');
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

// 宣伝履歴の読み込み
window.addEventListener('DOMContentLoaded', () => {
  const savedState = localStorage.getItem('jihou-status');
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

  if (savedPromo) {
    promoInput.value = savedPromo;
    promoDisplay.textContent = savedPromo;
  }

  fetchNewsAndWeather();
});

// 宣伝入力イベント＋履歴保存
// 宣伝入力イベント＋保存
promoInput.addEventListener('input', () => {
  const text = promoInput.value;
  promoDisplay.textContent = text;
  localStorage.setItem('promo-text', text);
});

// 再生許可取得
// 音声ON/OFF切り替え
enableBtn.addEventListener('click', () => {
  audio.muted = true;
  audio.play().then(() => {
    audio.pause();
    audio.currentTime = 0;
    audio.muted = false;
  }).catch(err => console.error('再生許可失敗:', err));
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
@@ -57,33 +65,30 @@ disableBtn.addEventListener('click', () => {
  localStorage.setItem('jihou-status', 'disabled');
});

// 時報のターゲット時刻
const targetHour = 2;
const targetMinute = 50;

// 時報チェック（0:00と14:00のみ）
setInterval(() => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const h = now.getHours();
  const m = now.getMinutes();
  const key = `${h}:${m}`;

  const isJihouTime =
    localStorage.getItem('jihou-status') === 'enabled' &&
    currentHour === targetHour &&
    currentMinute === targetMinute;
  const isEnabled = localStorage.getItem('jihou-status') === 'enabled';
  const isJihouTime = isEnabled && key in videos;

  newsBar.style.display = isJihouTime ? 'none' : 'block';

  if (isJihouTime && !alreadyPlayed) {
    alreadyPlayed = true;
    triggerJihou();
    triggerJihou(videos[key], audios[key]);
  }

  if (currentMinute !== targetMinute) {
  if (!isJihouTime) {
    alreadyPlayed = false;
  }
}, 1000);

function triggerJihou() {
// 時報発火（映像＋音声）
function triggerJihou(video, audio) {
  enableBtn.style.display = 'none';
  disableBtn.style.display = 'none';

@@ -95,6 +100,7 @@ function triggerJihou() {
  audio.play().catch(err => console.error('音声再生失敗:', err));

  video.onended = () => {
    video.style.display = 'none';
    const savedState = localStorage.getItem('jihou-status');
    if (savedState === 'enabled') {
      disableBtn.style.display = 'inline-block';
@@ -104,20 +110,37 @@ function triggerJihou() {
  };
}

// ニュースと天気を取得（ダミー構成）
function fetchNewsAndWeather() {
  const weekdayNews = [
    "日曜：町田市で秋祭り開催中！",
    "月曜：市役所前で献血キャンペーン",
    "火曜：駅前に新カフェオープン",
    "水曜：図書館で読書週間スタート",
    "木曜：町田高校が全国大会へ",
    "金曜：週末はフリーマーケット開催",
    "土曜：市民ホールで音楽フェス"
  ];
  const day = new Date().getDay();
  const news = weekdayNews[day];
  const weather = "☁️ 今日の町田市の天気：28°C / 21°C、曇り";

  newsText.textContent = `📰 ${news}　${weather}`;
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
