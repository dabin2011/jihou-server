const enableBtn = document.getElementById('enable-audio');
const disableBtn = document.getElementById('disable-audio');

const scrollBanner = document.getElementById("scroll-banner");
const scrollText = document.getElementById("scroll-text");

const messages = [
  { text: "本日はシゲシゲ動画に御アクセスありがとうございます。", url: "" },
  { text: "📢シゲシゲ広告📢　Akki‗104にて君もこれで一生童○!テトリス講座が配信中です。このテキストをクリックして動画に飛べます", url: "https://shige-shige.com/signup" },
  { text: "～注意～ここ最近学校のPC等でシゲシゲ動画やPixige、シゲシゲ生放送などといったサービスを視聴している方がいるようですが、運営はそのような使用方法を想定していません、学校のPC等で見るのは控えるようよろしくお願いいたします。", url: "" },
  { text: "📢シゲシゲ広告📢　ramen_syunyaにて待望の初！ボカロ投稿（初音ミク）が配信中です。このテキストをクリックして動画をチェック", url: "https://dabin051400.wixsite.com/shige/ramensyunya/%E5%BE%85%E6%9C%9B%E3%81%AE%E5%88%9D%EF%BC%81%E3%83%9C%E3%82%AB%E3%83%AD%E6%8A%95%E7%A8%BF%EF%BC%88%E5%88%9D%E9%9F%B3%E3%83%9F%E3%82%AF%EF%BC%89" }
  { text: "10月8日0時よりシゲシゲ時報、シゲシゲ広告がサービス開始しました。シゲシゲ時報は一日に0時、12時、19時に再生されます。", url: "" },
  { text: "📢シゲシゲ広告📢　ニコニコ動画保管庫にてしげないかが配信中です。このテキストをクリックして動画を見よう！", url: "https://dabin051400.wixsite.com/shige/shigedouga/%E3%80%8C%E3%81%97%E3%81%92%E3%81%AA%E3%81%84%E3%81%8B%E3%80%8D" }
{ text: "📢シゲシゲ広告📢　シゲシゲ動画公式チャンネルにて新・豪血寺一族 -煩悩解放 - レッツゴー！陰陽師配信中です。クリックして動画にジャンプ", url: "https://dabin051400.wixsite.com/shige/shigeshigedouga/%E6%96%B0%E3%83%BB%E8%B1%AA%E8%A1%80%E5%AF%BA%E4%B8%80%E6%97%8F-%E7%85%A9%E6%82%A9%E8%A7%A3%E6%94%BE-%E3%83%AC%E3%83%83%E3%83%84%E3%82%B4%E3%83%BC%EF%BC%81%E9%99%B0%E9%99%BD%E5%B8%AB" }
  { text: "シゲシゲ時報のゲスト時報第一号は小野寺あきとしに決定か？詳しい詳細が決まり次第この時報バーにてお知らせします！", url: "" }
  { text: "現在シゲシゲ動画の新バージョン名を絶賛募集中です。", url: "" }
];

let messageIndex = 0;
let scrollInterval;

function startScrollingMessages() {
  scrollBanner.style.display = 'block';
  showNextMessage();
  scrollInterval = setInterval(showNextMessage, 22000); // 20s animation + buffer
}

function stopScrollingMessages() {
  clearInterval(scrollInterval);
  scrollBanner.style.display = 'none';
  scrollText.onclick = null;
  scrollText.removeEventListener("touchstart", handleTap);
}

function handleTap() {
  const message = messages[messageIndex === 0 ? messages.length - 1 : messageIndex - 1];
  if (message.url) window.open(message.url, "_blank");
}

function showNextMessage() {
  const message = messages[messageIndex];

  scrollText.style.animation = 'none';
  void scrollText.offsetWidth; // 強制再描画
  scrollText.textContent = message.text;
  scrollText.style.animation = 'scrollText 20s linear';

  scrollText.onclick = handleTap;
  scrollText.addEventListener("touchstart", handleTap);

  messageIndex = (messageIndex + 1) % messages.length;
}

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

const jihouLinks = {
  "0:0": "https://dabin051400.wixsite.com/shige/%E3%82%B7%E3%82%B2pro-%E6%96%B0%E8%A6%8F%E4%BC%9A%E5%93%A1%E7%99%BB%E9%8C%B2",
  "12:0": "https://shige-shige.com/noon",
  "14:0": "https://shige-shige.com/afternoon"
};

let alreadyPlayed = false;

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

  startScrollingMessages(); // 初期表示
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
    triggerJihou(key, videos[key], audios[key]);
  }

  if (!isJihouTime) {
    alreadyPlayed = false;
  }
}, 1000);

// 時報再生
function triggerJihou(key, video, audio) {
  enableBtn.style.display = 'none';
  disableBtn.style.display = 'none';

  stopScrollingMessages(); // 時報中は非表示

  video.currentTime = 0;
  audio.currentTime = 0;
  video.style.display = 'block';

  video.play().catch(err => console.error('映像再生失敗:', err));
  audio.play().catch(err => console.error('音声再生失敗:', err));

  const link = jihouLinks[key];
  const openLink = () => {
    if (link) window.open(link, "_blank");
  };

  video.onclick = openLink;
  video.addEventListener("touchstart", openLink);

  video.onended = () => {
    video.style.display = 'none';
    video.onclick = null;
    video.removeEventListener("touchstart", openLink);

    startScrollingMessages(); // 時報が終わったら再表示

    const savedState = localStorage.getItem('jihou-status');
    if (savedState === 'enabled') {
      disableBtn.style.display = 'inline-block';
    } else {
      enableBtn.style.display = 'inline-block';
    }
  };
}
