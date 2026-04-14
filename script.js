let enabled = true; // 初期状態はON
const video = document.getElementById("jingleVideo");
const overlay = document.getElementById("overlay");
const soundToggle = document.getElementById("soundToggle");

// ON/OFF ボタン
soundToggle.addEventListener("click", () => {
  enabled = !enabled;
  soundToggle.textContent = enabled ? "🔊" : "🔇";
});

// 毎秒チェック
setInterval(checkTime, 1000);

function checkTime() {
  if (!enabled) return;

  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();

  // 23:59:00 に再生
  if (h === 23 && m === 59 && s === 0) {
    playVideo();
  }
}

function playVideo() {
  overlay.classList.add("show");
  video.currentTime = 0;
  video.play();

  video.onended = () => {
    overlay.classList.remove("show");
  };
}
