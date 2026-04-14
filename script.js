let enabled = true;
const video = document.getElementById("jingleVideo");
const overlay = document.getElementById("overlay");
const soundToggle = document.getElementById("soundToggle");

soundToggle.addEventListener("click", () => {
  enabled = !enabled;
  soundToggle.textContent = enabled ? "🔊" : "🔇";
});

setInterval(checkTime, 1000);

function checkTime() {
  if (!enabled) return;

  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();

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
