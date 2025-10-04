const video = document.getElementById('jihou-video');
const audio = document.getElementById('jihou-audio');
const enableBtn = document.getElementById('enable-audio');
const disableBtn = document.getElementById('disable-audio');
const newsBar = document.getElementById('news-bar');
const newsText = document.getElementById('news-text');
const promoInput = document.getElementById('promo-input');
const promoDisplay = document.getElementById('promo-display');

let alreadyPlayed = false;

// 宣伝履歴の読み込み
window.addEventListener('DOMContentLoaded', () => {
  const savedState = localStorage.getItem('jihou-status');
  const savedPromo = localStorage.getItem('promo-text');

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
promoInput.addEventListener('input', () => {
  const text = promoInput.value;
  promoDisplay.textContent = text;
  localStorage.setItem('promo-text', text);
});

// 再生許可取得
enableBtn.addEventListener('click', () => {
  audio.muted = true;
  audio.play().then(() => {
    audio.pause();
    audio.currentTime = 0;
    audio.muted = false;
  }).catch(err => console.error('再生許可失敗:', err));

  enableBtn.style.display = 'none';
  disableBtn.style.display = 'inline-block';
  localStorage.setItem('jihou-status', 'enabled');
});

disableBtn.addEventListener('click', () => {
  disableBtn.style.display = 'none';
  enableBtn.style.display = 'inline-block';
  localStorage.setItem('jihou-status', 'disabled');
});

// 時報のターゲット時刻
const targetHour = 2;
const targetMinute = 50;

setInterval(() => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();

  const isJihouTime =
    localStorage.getItem('jihou-status') === 'enabled' &&
    currentHour === targetHour &&
    currentMinute === targetMinute;

  newsBar.style.display = isJihouTime ? 'none' : 'block';

  if (isJihouTime && !alreadyPlayed) {
    alreadyPlayed = true;
    triggerJihou();
  }

  if (currentMinute !== targetMinute) {
    alreadyPlayed = false;
  }
}, 1000);

function triggerJihou() {
  enableBtn.style.display = 'none';
  disableBtn.style.display = 'none';

  video.currentTime = 0;
  audio.currentTime = 0;
  video.style.display = 'block';

  video.play().catch(err => console.error('映像再生失敗:', err));
  audio.play().catch(err => console.error('音声再生失敗:', err));

  video.onended = () => {
    const savedState = localStorage.getItem('jihou-status');
    if (savedState === 'enabled') {
      disableBtn.style.display = 'inline-block';
    } else {
      enableBtn.style.display = 'inline-block';
    }
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
}
