const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

const SPACE_KEY = 32;

function togglePlay() {
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

function updateButton() {
  const icon = video.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip(element) {
 video.currentTime += parseFloat(element.dataset.skip);
}

function setProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function onSpaceKeydown(evt) {
  if (evt.keyCode === SPACE_KEY) {
    togglePlay();
  }
}

function onSkipButtonClick(evt) {
  skip(evt.target);
  setProgress();
}

function onRangeUpdate(evt) {
  video[evt.target.name] = this.value;
}

function onTimeUpdate() {
  setProgress();
}

function onProgressChange(evt) {
  const scrubTime = (evt.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);
toggle.addEventListener('keydown', function(evt) { evt.stopPropagation(); });
document.addEventListener('keydown', onSpaceKeydown);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', onTimeUpdate);

skipButtons.forEach(button => {
  button.addEventListener('click', onSkipButtonClick);
});

ranges.forEach(range => {
  range.addEventListener('change', onRangeUpdate);
  range.addEventListener('mousemove', onRangeUpdate);
});

let mousedown = false;
progress.addEventListener('click', onProgressChange);
progress.addEventListener('mousemove', evt => mousedown && onProgressChange(evt));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
