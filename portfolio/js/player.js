const player = document.querySelector('.player');
const poster = player.querySelector('.poster');
const videoBtn = player.querySelector('.video-button');
const video = player.querySelector('.player-video');
const playBtn = player.querySelector('.play-pause');
const currentTime = player.querySelector('.player-slider[name="currentTime"]');
const volume = player.querySelector('.player-slider[name="volume"]');
const volumeBtn = player.querySelector('.volume');

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
  const sampleColor = document.querySelector('.section-title');
  const filledColor = window.getComputedStyle(sampleColor).color;

  let percent = inputRange.value / inputRange.max * 100;
  if (percent < 50) { percent = Math.ceil(percent)}
  if (percent >= 50) { percent = Math.floor(percent)}
  inputRange.style.background = `linear-gradient(to right, ${filledColor} 0%, ${filledColor} ${percent}%, #ffffff ${percent}%, #ffffff 100%)`;
}

function getInputColorStart() {
  const sampleColor = document.querySelector('.section-title');
  const filledColor = window.getComputedStyle(sampleColor).color;

  let percent = this.value / this.max * 100;
  if (percent < 50) { percent = Math.ceil(percent)}
  if (percent >= 50) { percent = Math.floor(percent)}
  this.style.background = `linear-gradient(to right, ${filledColor} 0%, ${filledColor} ${percent}%, #ffffff ${percent}%, #ffffff 100%)`;
}

function handleChangeValue() {
  video[this.name] = this.value;
  if (this.name === 'volume') {
    checkVolume();
    getInputColor(volume);
  }
}

function changeCurrentTime() {
  currentTime.value = this.currentTime;
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


currentTime.max = Math.floor(video.duration);
video.addEventListener('timeupdate', changeCurrentTime);

currentTime.addEventListener('input', getInputColorStart);
volume.addEventListener('input', getInputColorStart);

currentTime.addEventListener('change', handleChangeValue);

volume.addEventListener('change', handleChangeValue);
volume.addEventListener('mousemove', handleChangeValue);
volumeBtn.addEventListener('click', toggleVolume)







