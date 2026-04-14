window.onload = () => {
  const overlay = document.getElementById("overlay");
  const video = document.getElementById("jingleVideo");

  overlay.classList.add("show");
  video.currentTime = 0;
  video.play();

  video.onended = () => {
    overlay.classList.remove("show");
  };
};
