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

const ads = [
  "🌟 シゲシゲ電機、秋のセール開催中！",
  "📣 町田市の焼き鳥屋『とり吉』、本日半額！",
  "🎬 新作映画『時報の彼方』、全国ロードショー！",
  "🧴 スキンケアブランド『黒美』、初回限定30%OFF！",
  "📻 ラジオ番組『シゲシゲタイム』、毎朝8時放送中！"
];

let alreadyPlayed = false;

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

function showRandomAd() {
  const randomAd = ads[Math.floor(Math.random() * ads.length)];
  adText.textContent = randomAd;
  adBar.style.display = 'flex';
}

function hideAd() {
  adBar.style.display = 'none';
}

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
    showRandomAd();
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
