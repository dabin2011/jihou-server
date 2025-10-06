const enableBtn = document.getElementById('enable-audio');
const disableBtn = document.getElementById('disable-audio');

const videos = {
  "0:0": document.getElementById('jihou-video-0'),
  "12:0": document.getElementById('jihou-video-12'),
  "14:0": document.getElementById('jihou-video-14')
};

const audios = {
  "0:0": document.getElementById('jihou-audio-0'),
  "12:0": document.getElementById('jihou-audio-12'),
  "14:0": document.getElementById('jihou-audio-14')
};

const adBar = document.getElementById('ad-bar');
const adText = document.getElementById('ad-text');
const adForm = document.getElementById('ad-form');
const adInput = document.getElementById('ad-input');
const status = document.getElementById('status');

let ads = [];
let adIndex = 0;
let alreadyPlayed = false;

const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbzhCPDGCumcf49QyGExRcBbcKAgzZj2l7mH2fPONXHA2kNt7vaaysCB-KU06nxQuv4T/exec";

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

  fetchAds();
});

// 広告取得
function fetchAds() {
  fetch(SHEET_API_URL)
    .then(res => res.json())
    .then(data => {
      ads = data.filter(Boolean);
      adIndex = 0;
      showNextAd();
    })
    .catch(err => {
      console.error("広告取得失敗:", err);
      adText.textContent = "広告を取得できませんでした";
    });
}

// 広告表示
function showNextAd() {
  if (ads.length === 0) return;
  adText.textContent = ads[adIndex];
  adText.style.animation = 'none';
  void adText.offsetWidth;
  adText.style.animation = 'scrollText 20s linear';
  adBar.style.display = 'flex';
  adIndex = (adIndex + 1) % ads.length;
}

adText.addEventListener('animationend', () => {
  if (!alreadyPlayed) showNextAd();
});

// 投稿処理
adForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const ad = adInput.value.trim();
  if (!ad) return;

  fetch(SHEET_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ad })
  })
  .then(res => res.text())
  .then(() => {
    status.textContent = "投稿が完了しました！";
    adInput.value = "";
    fetchAds();
  })
  .catch(err => {
    status.textContent = "投稿に失敗しました…";
    console.error(err);
  });
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
    hideAd();
    triggerJihou(videos[key], audios[key]);
  }

  if (!isJihouTime) {
    alreadyPlayed = false;
    if (adText.textContent === '') showNextAd();
  }
}, 1000);

// 広告非表示
function hideAd() {
  adBar.style.display = 'none';
  adText.textContent = '';
}

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
</body>
</html>



