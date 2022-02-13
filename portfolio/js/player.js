const player = document.querySelector('.player');
const poster = player.querySelector('.poster');
const playerControls = player.querySelector('.player-controls');
const videoBtn = player.querySelector('.video-button');
const video = player.querySelector('.player-video');
const playBtn = player.querySelector('.play-pause');
const currentTime = player.querySelector('.player-slider[name="currentTime"]');
const volume = player.querySelector('.player-slider[name="volume"]');
const volumeBtn = player.querySelector('.volume');
const fullScreen = player.querySelector('.full-screen');
let filledColor = getComputedStyle(document.documentElement).getPropertyValue('--text-tittle-color');

function closePoster() {
  if (poster.style.display = 'block') {
    poster.style.opacity = '0';
    setTimeout(() => poster.style.display = 'none', 500);
  }
  togglePlayerControls()
}

function toggleVideo() {
  const act = (video.paused) ? 'play' : 'pause';
  video[act]();
  if (video.paused) {
    videoBtn.style.display = 'block';
  } else {
    videoBtn.style.display = 'none';
  }
}

function changePlayBtn() {
  const play = player.querySelector('.play');
  const pause = player.querySelector('.pause');
  if (this.paused) {
    pause.style.display = 'none';
    play.style.display = 'block';
  } else {
    pause.style.display = 'block';
    play.style.display = 'none';
  }
}

function getInputColor(inputRange) {
  let percent = inputRange.value / inputRange.max * 100;
  if (percent < 50) { percent += 0.1}
  if (percent >= 50) { percent -= 0.1}
  inputRange.style.background = `linear-gradient(to right, ${filledColor} 0%, ${filledColor} ${percent}%, #ffffff ${percent}%, #ffffff 100%)`;
}

function handleChangeVolume() {
  togglePlayerControls()
  video[this.name] = this.value;
    checkVolume();
    getInputColor(volume);
}

function handleChangeTime() {
  togglePlayerControls()
  video[this.name] = this.value / this.max * video.duration;
}

function changeTime() {
  currentTime.value = this.currentTime / this.duration * currentTime.max;
  getInputColor(currentTime);
}

function toggleVolume() {
  const on = player.querySelector('.on');
  const off = player.querySelector('.off');

  video.muted = !video.muted;

  if (video.muted) {
    on.style.display = 'none';
    off.style.display = 'block';
  } else {
    off.style.display = 'none';
    on.style.display = 'block';
  }
}

function checkVolume() {
  const on = player.querySelector('.on');
  const off = player.querySelector('.off');

  if (!video.volume) {
    on.style.display = 'none';
    off.style.display = 'block';
    video.muted = true;
  } else {
    off.style.display = 'none';
    on.style.display = 'block';
    video.muted = false;
  }
}

function getColorTheme() {
  setTimeout(() => {
    filledColor = getComputedStyle(document.documentElement).getPropertyValue('--text-tittle-color');
    getInputColor(currentTime);
    getInputColor(volume);
  }, 100);
}

function getFullScreen() {
  video.requestFullscreen()
}

function togglePlayerControls() {
  clearTimeout (i)
  playerControls.style.bottom = '0px'
  i = setTimeout(() => playerControls.style.bottom = '-60px', 2000)
}

videoBtn.addEventListener('click', closePoster);

video.addEventListener('click', toggleVideo);
videoBtn.addEventListener('click', toggleVideo);
playBtn.addEventListener('click', toggleVideo);

video.addEventListener('play', changePlayBtn);
video.addEventListener('pause', changePlayBtn);

const themeToggle = document.querySelector('.theme');
themeToggle.addEventListener('click', getColorTheme);

video.addEventListener('timeupdate', changeTime);
currentTime.addEventListener('input', handleChangeTime);

volume.addEventListener('change', handleChangeVolume);

volumeBtn.addEventListener('click', toggleVolume);

fullScreen.addEventListener('click', getFullScreen);

let i = null;
video.addEventListener('mousemove', togglePlayerControls);
video.addEventListener('touch', togglePlayerControls);









