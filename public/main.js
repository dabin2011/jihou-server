const scrollText = document.getElementById("scroll-text");
const enableBtn = document.getElementById("enable-audio");
const disableBtn = document.getElementById("disable-audio");

const messages = [
  { text: "シゲシゲ時報へようこそ。", url: "https://shige-shige.com/welcome" },
  { text: "新規会員登録はこちらから。", url: "https://shige-shige.com/signup" },
  { text: "毎日更新中！", url: "https://shige-shige.com/news" },
  { text: "イベント情報もチェックしてね。", url: "https://shige-shige.com/events" },
  { text: "今日もシゲシゲで元気に！", url: "https://shige-shige.com/motivation" },
  { text: "夜の特別時報は0:50に配信！", url: "https://shige-shige.com/night" },
  { text: "フォローして最新情報をゲット！", url: "https://shige-shige.com/follow" },
  { text: "スタッフ募集中！", url: "https://shige-shige.com/recruit" },
  { text: "10月のキャンペーン開催中！", url: "https://shige-shige.com/oct-campaign" },
  { text: "次回のアップデート情報はこちら。", url: "https://shige-shige.com/update" },
  { text: "シゲシゲ検定に挑戦！", url: "https://shige-shige.com/quiz" },
  { text: "あなたの時報を作ろう！", url: "https://shige-shige.com/custom" },
  { text: "人気ランキングをチェック！", url: "https://shige-shige.com/ranking" },
  { text: "時報の思い出を投稿しよう。", url: "https://shige-shige.com/memories" },
  { text: "おすすめコンテンツはこちら。", url: "https://shige-shige.com/recommend" },
  { text: "シゲシゲの裏話を公開中！", url: "https://shige-shige.com/behind" },
  { text: "時報の仕組みを解説！", url: "https://shige-shige.com/how" },
  { text: "シゲシゲのロゴが新しくなりました。", url: "https://shige-shige.com/logo" },
  { text: "ユーザーの声を紹介中。", url: "https://shige-shige.com/voices" },
  { text: "シゲシゲの歴史を知ろう。", url: "https://shige-shige.com/history" }
];

let index = 0;
let scrollInterval;

function showNextMessage() {
  const msg = messages[index];
  scrollText.style.animation = "none";
  void scrollText.offsetWidth;
  scrollText.textContent = msg.text;
  scrollText.style.animation = "scrollText 20s linear infinite";
  scrollText.onclick = () => window.open(msg.url, "_blank");
  index = (index + 1) % messages.length;
}

function startScroll() {
  showNextMessage();
  scrollInterval = setInterval(showNextMessage, 22000);
}

function stopScroll() {
  clearInterval(scrollInterval);
  scrollText.textContent = "";
  scrollText.onclick = null;
}

const times = {
  "0:0": { video: "video-0000", audio: "audio-0000" },
  "0:50": { video: "video-0050", audio: "audio-0050" },
  "19:0": { video: "video-1900", audio: "audio-1900" }
};

let alreadyPlayed = false;

function triggerJihou(key) {
  const { video, audio } = times[key];
  const v = document.getElementById(video);
  const a = document.getElementById(audio);

  stopScroll();
  v.style.display = "block";
  v.currentTime = 0;
  a.currentTime = 0;
  v.play();
  a.play();

  v.onended = () => {
    v.style.display = "none";
    startScroll();
  };
}

enableBtn.onclick = () => {
  localStorage.setItem("jihou-status", "enabled");
  enableBtn.style.display = "none";
  disableBtn.style.display = "inline-block";
};

disableBtn.onclick = () => {
  localStorage.setItem("jihou-status", "disabled");
  disableBtn.style.display = "none";
  enableBtn.style.display = "inline-block";
};

window.onload = () => {
  const status = localStorage.getItem("jihou-status");
  if (status === "enabled") {
    enableBtn.style.display = "none";
    disableBtn.style.display = "inline-block";
  } else {
    enableBtn.style.display = "inline-block";
    disableBtn.style.display = "none";
  }
  startScroll();
};

setInterval(() => {
  const now = new Date();
  const key = `${now.getHours()}:${now.getMinutes()}`;
  const enabled = localStorage.getItem("jihou-status") === "enabled";

  if (enabled && times[key] && !alreadyPlayed) {
    alreadyPlayed = true;
    triggerJihou(key);
  }

  if (!times[key]) {
    alreadyPlayed = false;
  }
}, 1000);
  video.onended = () => {


