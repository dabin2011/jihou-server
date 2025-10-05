const enableBtn = document.getElementById('enable-audio');
const disableBtn = document.getElementById('disable-audio');

const videos = {
  "0:0": document.getElementById('jihou-video-0'),
  "14:0": document.getElementById('jihou-video-14')
};

const audios = {
  "0:0": document.getElementById('jihou-audio-0'),
  "14:0": document.getElementById('jihou-audio-14')
};

const adBar = document.getElementById('ad-bar');
const adText = document.getElementById('ad-text');

const adForm = document.getElementById('ad-form');
const adInput = document.getElementById('ad-input');

let ads = [
  "🌟 シゲシゲ電機、秋のセール開催中！",
  "📣 焼き鳥屋『とり吉』、本日半額！",
  "🎬 映画『時報の彼方』、全国ロードショー！"
];

let adIndex = 0;
let alreadyPlayed = false;

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

adForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newAd = adInput.value.trim();
  if (newAd) {
    ads.push(newAd);
    adInput.value = '';
    adIndex = ads.length - 1;
    showNextAd();
  }
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

function hideAd() {
  adBar.style.display = 'none';
  adText.textContent = '';
}

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
