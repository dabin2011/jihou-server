const scrollText = document.getElementById("scroll-text");
const enableBtn = document.getElementById("enable-audio");
const disableBtn = document.getElementById("disable-audio");

const messages = [
  { text: "シゲシゲ動画へようこそ。", url: "https://shige-shige.com/welcome" },
  { text: "⚠注意⚠　ここ最近学校のPCを用いて動画を視聴している方がいるようです。その影響によりシゲシゲ動画およびその他姉妹サイトは10月9日より8時～16時の間サイト閉鎖時間としました。シゲシゲ動画をご利用される際には必ずお手持ちのスマートフォンから視聴されるようよろしくお願いいたします。スマートフォン用QRコードはこのバーをクリック", url: "https://shige-shige.com/signup" },
  { text: "📢シゲシゲ広告📢Akki‗104にて君もこれで一生童○!テトリス講座が配信中です。このバーをクリックして動画にジャンプ", url: "https://dabin051400.wixsite.com/shige/copy-of-shigedouga/%E5%90%9B%E3%82%82%E3%81%93%E3%82%8C%E3%81%A7%E4%B8%80%E7%94%9F%E7%AB%A5%E2%97%8B!%E3%83%86%E3%83%88%E3%83%AA%E3%82%B9%E8%AC%9B%E5%BA%A7" },
  { text: "シゲシゲ時報とシゲシゲ広告がサービス開始しました。時報は毎日0時と19時に流れます", url: "https://shige-shige.com/events" },
  { text: "📢シゲシゲ広告📢ニコニコ動画保管庫にてしげないか配信中です。このバーをクリックして動画にジャンプ", url: "https://dabin051400.wixsite.com/shige/shigedouga/%E3%80%8C%E3%81%97%E3%81%92%E3%81%AA%E3%81%84%E3%81%8B%E3%80%8D" },
  { text: "シゲシゲ動画の新バージョン名絶賛募集中！", url: "https://shige-shige.com/night" },
  { text: "📢シゲシゲ広告📢ramen_syunyaにて待望の初！ボカロ投稿（初音ミク）配信中です。このバーをクリックして動画にジャンプ", url: "https://dabin051400.wixsite.com/shige/ramensyunya/%E5%BE%85%E6%9C%9B%E3%81%AE%E5%88%9D%EF%BC%81%E3%83%9C%E3%82%AB%E3%83%AD%E6%8A%95%E7%A8%BF%EF%BC%88%E5%88%9D%E9%9F%B3%E3%83%9F%E3%82%AF%EF%BC%89" },
  { text: "シゲProに登録して、自分の趣味など好きな動画を投稿しよう。シゲPro登録はこのバーをクリック", url: "https://dabin051400.wixsite.com/shige/%E3%82%B7%E3%82%B2pro-%E6%96%B0%E8%A6%8F%E4%BC%9A%E5%93%A1%E7%99%BB%E9%8C%B2" },
  { text: "📢シゲシゲ広告📢シゲシゲ動画公式チャンネルにて新・豪血寺一族 -煩悩解放 - レッツゴー！陰陽師が配信中です。このバーをクリックして動画を見よう", url: "https://dabin051400.wixsite.com/shige/shigeshigedouga/%E6%96%B0%E3%83%BB%E8%B1%AA%E8%A1%80%E5%AF%BA%E4%B8%80%E6%97%8F-%E7%85%A9%E6%82%A9%E8%A7%A3%E6%94%BE-%E3%83%AC%E3%83%83%E3%83%84%E3%82%B4%E3%83%BC%EF%BC%81%E9%99%B0%E9%99%BD%E5%B8%AB" },
  { text: "シゲシゲ動画", url: "https://shige-shige.com/update" },
  { text: "📢シゲシゲ広告📢ニコニコ動画保管庫にて真真茂島茂樹島茂樹 （コメ付き）配信中です。このバーをクリックで動画を視聴", url: "https://dabin051400.wixsite.com/shige/shigedouga/-%E7%9C%9F%E7%9C%9F%E8%8C%82%E5%B3%B6%E8%8C%82%E6%A8%B9%E5%B3%B6%E8%8C%82%E6%A8%B9-%EF%BC%88%E3%82%B3%E3%83%A1%E4%BB%98%E3%81%8D%EF%BC%89" },
  { text: "シゲシゲ時報一発目のゲストはAkki‗104⁉詳しい詳細はまたこのバーでお伝えします。", url: "https://shige-shige.com/custom" },
  { text: "📢シゲシゲ広告📢", url: "https://shige-shige.com/ranking" },
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



