const video = document.getElementById('jihou-video');
const audio = document.getElementById('jihou-audio');
const enableBtn = document.getElementById('enable-audio');
const disableBtn = document.getElementById('disable-audio');
const newsBar = document.getElementById('news-bar');

let alreadyPlayed = false;

// 初期状態の読み込み
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

// 再生許可取得
enableBtn.addEventListener('click', () => {
  audio.muted = true;
  audio.play().then(() => {
    audio.pause();
    audio.currentTime = 0;
    audio.muted = false;
    console.log('✅ 再生許可取得済み');
  }).catch((err) => {
    console.error('❌ 再生許可失敗:', err);
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

// 時報のターゲット時刻（時と分のみ）
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

  // ニュースバー表示制御（時報中は非表示）
  newsBar.style.display = isJihouTime ? 'none' : 'block';

  // 時報発火（1分に1回）
  if (isJihouTime && !alreadyPlayed) {
    alreadyPlayed = true;
    triggerJihou();
  }

  if (currentMinute !== targetMinute) {
    alreadyPlayed = false;
  }
}, 1000);

// 音声＋映像を同時再生
function triggerJihou() {
  enableBtn.style.display = 'none';
  disableBtn.style.display = 'none';

  video.currentTime = 0;
  audio.currentTime = 0;

  video.style.display = 'block';

  video.play().catch(err => console.error('❌ 映像再生失敗:', err));
  audio.play().then(() => {
    console.log('✅ 音声再生成功');
  }).catch(err => {
    console.error('❌ 音声再生失敗:', err);
  });

  video.onended = () => {
    const savedState = localStorage.getItem('jihou-status');
    if (savedState === 'enabled') {
      disableBtn.style.display = 'inline-block';
    } else {
      enableBtn.style.display = 'inline-block';
    }
  };
}
