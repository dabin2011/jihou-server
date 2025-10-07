const enableBtn = document.getElementById("enable-audio");
const disableBtn = document.getElementById("disable-audio");

const scrollBanner = document.getElementById("scroll-banner");
const scrollText = document.getElementById("scroll-text");

const messages = [
  { text: "シゲシゲ時報へようこそ。", url: "https://shige-shige.com/welcome" },
  { text: "新規会員登録はこちらから。", url: "https://shige-shige.com/signup" },
  { text: "毎日更新中！", url: "https://shige-shige.com/news" },
  { text: "イベント情報もチェックしてね。", url: "https://shige-shige.com/events" },
  { text: "今日もシゲシゲで元気に！", url: "https://shige-shige.com/motivation" }
];

let messageIndex = 0;
let scrollInterval;

function showNextMessage() {
  const message = messages[messageIndex];
  scrollText.style.animation = "none";
  void scrollText.offsetWidth;
  scrollText.textContent = message.text;
  scrollText.style.animation = "scrollText 20s linear";

  scrollText.onclick = () => window.open(message.url, "_blank");
  scrollText.addEventListener("touchstart", () => window.open(message.url, "_blank"));

  messageIndex = (messageIndex + 1) % messages.length;
}

function startScrollingMessages() {
  scrollBanner.style.display = "block";
  showNextMessage();
  scrollInterval = setInterval(showNextMessage, 22000);
}

function stopScrollingMessages() {
  clearInterval(scrollInterval);
  scrollBanner.style.display = "none";
  scrollText.onclick = null;
  scrollText.removeEventListener("touchstart", () => {});
}

const videos = {
  "0:0": document.getElementById("jihou-video-0"),
  "0:15": document.getElementById("jihou-video-0015"),
  "14:0": document.getElementById("jihou-video-14")
};

const audios = {
  "0:0": document.getElementById("jihou-audio-0"),
  "0:15": document.getElementById("jihou-audio-0015"),
  "14:0": document.getElementById("jihou-audio-14")
};

const jihouLinks = {
  "0:0": "https://shige-shige.com/midnight",
  "0:15": "https://shige-shige.com/noon",
  "14:0": "https://shige-shige.com/afternoon"
};

let alreadyPlayed = false;

enableBtn.addEventListener("click", () => {
  localStorage.setItem("jihou-status", "enabled");
  enableBtn.style.display = "none";
  disableBtn.style.display = "inline-block";
});

disableBtn.addEventListener("click", () => {
  localStorage.setItem("jihou-status", "disabled");
  disableBtn.style.display = "none";
  enableBtn.style.display = "inline-block";
});

window.addEventListener("DOMContentLoaded", () => {
  const savedState = localStorage.getItem("jihou-status");
  if (savedState === "enabled") {
    enableBtn.style.display = "none";
    disableBtn.style.display = "inline-block";
  } else {
    enableBtn.style.display = "inline-block";
    disableBtn.style.display = "none";
  }

  startScrollingMessages();
});

setInterval(() => {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const key = `${h}:${m}`;

  const isEnabled = localStorage.getItem("jihou-status") === "enabled";
  const isJihouTime = isEnabled && key in videos;

  if (isJihouTime && !alreadyPlayed) {
    alreadyPlayed = true;
    triggerJihou(key, videos[key], audios[key]);
  }

  if (!isJihouTime) {
    alreadyPlayed = false;
  }
}, 1000);

function triggerJihou(key, video, audio) {
  enableBtn.style.display = "none";
  disableBtn.style.display = "none";

  stopScrollingMessages();

  video.currentTime = 0;
  audio.currentTime = 0;
  video.style.display = "block";

  video.play().catch(err => console.error("映像再生失敗:", err));
  audio.play().catch(err => console.error("音声再生失敗:", err));

  const link = jihouLinks[key];
  const openLink = () => {
    if (link) window.open(link, "_blank");
  };

  video.onclick = openLink;
  video.addEventListener("touchstart", openLink);

  video.onended = () => {
    video.style.display = "none";
    video.onclick = null;
    video.removeEventListener("touchstart", openLink);

    startScrollingMessages();

    const savedState = localStorage.getItem("jihou-status");
    if (savedState === "enabled") {
      disableBtn.style.display = "inline-block";
    } else {
      enableBtn.style.display = "inline-block";
    }
  };
}

