// public/main.js
const video = document.getElementById('jihou-video');
const enableBtn = document.getElementById('enable-audio');
const disableBtn = document.getElementById('disable-audio');

window.addEventListener('DOMContentLoaded', () => {
  const savedState = localStorage.getItem('jihou-status');
  if (savedState === 'enabled') {
    video.muted = false;
    enableBtn.style.display = 'none';
    disableBtn.style.display = 'inline-block';
  } else {
    video.muted = true;
    enableBtn.style.display = 'inline-block';
    disableBtn.style.display = 'none';
  }
});

enableBtn.addEventListener('click', () => {
  video.muted = false;
  video.load();
  enableBtn.style.display = 'none';
  disableBtn.style.display = 'inline-block';
  localStorage.setItem('jihou-status', 'enabled');
});

disableBtn.addEventListener('click', () => {
  video.muted = true;
  video.load();
  disableBtn.style.display = 'none';
  enableBtn.style.display = 'inline-block';
  localStorage.setItem('jihou-status', 'disabled');
});

setInterval(() => {
  const now = new Date();
  if (now.getHours() === 0 && now.getMinutes() === 0 && now.getSeconds() === 0) {
  if (now.getHours() === 0 && now.getMinutes() === 10 && now.getSeconds() === 0) {
    triggerJihou();
  }
}, 1000);
@@ -53,3 +53,4 @@
    }
  };
}
