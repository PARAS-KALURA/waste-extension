let dogAudio = null;
let attached = false;

console.log("🐶 Dog Voice Extension Loaded");

function startDogSound(video) {
  console.log("🐶 Replacing YouTube audio");

  if (dogAudio) return;

  video.muted = true;

  dogAudio = new Audio(chrome.runtime.getURL("sounds/dog.mp3"));
  dogAudio.loop = true;

  dogAudio.play().catch(() => {
    console.log("🐶 Audio blocked until user interaction");
  });
}

function attachToVideo() {
  const video = document.querySelector("video");
  if (!video || attached) return;

  attached = true;

  video.addEventListener("play", () => startDogSound(video));
}

const observer = new MutationObserver(attachToVideo);
observer.observe(document.body, { childList: true, subtree: true });
