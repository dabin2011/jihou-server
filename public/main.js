const adBar = document.getElementById('ad-bar');
const adText = document.getElementById('ad-text');

let ads = [];
let adIndex = 0;

async function fetchAds() {
  try {
    const res = await fetch('https://api.pageclip.co/form/shigeshige-kokok/submissions', {
      headers: { 'Authorization': 'Bearer api_rC6Mj9ZglhTVcSuR7qcEUdMCk05On7EO' }
    });
    const data = await res.json();
    ads = data.map(entry => entry.data.ad).filter(Boolean);
    adIndex = 0;
    showNextAd();
  } catch (err) {
    console.error('広告取得失敗:', err);
    adText.textContent = '広告を取得できませんでした';
  }
}

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
  showNextAd();
});

window.addEventListener('DOMContentLoaded', () => {
  fetchAds();
});


