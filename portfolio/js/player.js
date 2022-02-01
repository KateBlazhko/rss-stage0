const player = document.querySelector('.player');
const poster = player.querySelector('.poster');
const videoBtn = player.querySelector('.video-button');
const video = player.querySelector('.player-video');
const playBtn = player.querySelector('.play-pause');
const currentTime = player.querySelector('.player-slider[name="currentTime"]');
const volume = player.querySelector('.player-slider[name="volume"]');
const volumeBtn = player.querySelector('.volume');

function closePoster() {
  if (poster.style.display = 'block') {
    poster.style.opacity = '0';
    setTimeout(() => poster.style.display = 'none', 500);
  }
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
  let filledColor = getComputedStyle(document.documentElement).getPropertyValue('--text-tittle-color');

  let percent = inputRange.value / inputRange.max * 100;
  if (percent < 50) { percent = Math.ceil(percent)}
  if (percent >= 50) { percent = Math.floor(percent)}
  inputRange.style.background = `linear-gradient(to right, ${filledColor} 0%, ${filledColor} ${percent}%, #ffffff ${percent}%, #ffffff 100%)`;
}

function handleChangeVolume() {
  video[this.name] = this.value;
    checkVolume();
    getInputColor(volume);
}

function handleChangeTime() {
  video[this.name] = this.value / this.max * video.duration;
  video.play();
}

function changeTime() {
  currentTime.value = this.currentTime / this.duration * currentTime.max;
  getInputColor(currentTime);
}

function toggleVolume() {
  const on = player.querySelector('.on');
  const off = player.querySelector('.off');

  video.muted = !video.muted;

  if (video.muted === true) {
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

  if (video.volume === 0) {
    on.style.display = 'none';
    off.style.display = 'block';
  } else {
    off.style.display = 'none';
    on.style.display = 'block';
  }
}


video.addEventListener('click', toggleVideo);
videoBtn.addEventListener('click', toggleVideo);
playBtn.addEventListener('click', toggleVideo);

video.addEventListener('play', changePlayBtn);
video.addEventListener('pause', changePlayBtn);

video.addEventListener('timeupdate', changeTime);

currentTime.addEventListener('input', () => getInputColor(currentTime));
volume.addEventListener('input',() => getInputColor(volume));

currentTime.addEventListener('mousedown', () => { video.pause() });
currentTime.addEventListener('change', handleChangeTime);

volume.addEventListener('change', handleChangeVolume);
volume.addEventListener('mousemove', handleChangeVolume);
volumeBtn.addEventListener('click', toggleVolume)
videoBtn.addEventListener('click', closePoster)







