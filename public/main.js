const video = document.getElementById('jihou-video');
const enableBtn = document.getElementById('enable-audio');
const disableBtn = document.getElementById('disable-audio');

// テスト用：最初から時報ON
let jihouEnabled = true;
enableBtn.style.display = 'none';
disableBtn.style.display = 'inline-block';

// ボタン操作（本番用に戻すときに使う）
enableBtn.addEventListener('click', () => {
  jihouEnabled = true;
  enableBtn.style.display = 'none';
  disableBtn.style.display = 'inline-block';

  // 再生許可を得るために一瞬だけ無音再生
  video.muted = true;
  video.play().then(() => {
    video.pause();
    video.currentTime = 0;
    video.muted = false;
    console.log('✅ 再生許可取得済み');
  }).catch((err) => {
    console.error('❌ 再生許可失敗:', err);
  });
});

// 30秒後に動画再生（テスト用）
setTimeout(() => {
  if (jihouEnabled) {
    video.muted = false;
    video.volume = 1.0;
    video.style.display = 'block';
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          console.log('✅ 動画再生成功');
        })
        .catch((error) => {
          console.error('❌ 動画再生失敗:', error);
        });
    }
  }
}, 30000); // ← ページ読み込みから30秒後

