let startTime;
let elapsedTime = 0;
let timerInterval;
let laps = [];
let lapCounter = 1;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');
const startStopButton = document.getElementById('startStopButton');
const lapsDisplay = document.getElementById('laps');

function startStop() {
  if (timerInterval) {
    clearInterval(timerInterval);
    startStopButton.textContent = 'Start';
  } else {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 10);
    startStopButton.textContent = 'Stop';
  }
}

function updateTime() {
  const now = Date.now();
  elapsedTime = now - startTime;
  updateDisplay();
}

function updateDisplay() {
  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  const milliseconds = elapsedTime % 1000;

  minutesDisplay.textContent = padTime(minutes);
  secondsDisplay.textContent = padTime(seconds);
  millisecondsDisplay.textContent = padTime(milliseconds, true);
}

function padTime(time, isMilliseconds = false) {
  return isMilliseconds ? time.toString().padStart(3, '0') : time.toString().padStart(2, '0');
}

function lap() {
  laps.push(elapsedTime);
  const lapTime = laps[laps.length - 1] - laps[laps.length - 2] || elapsedTime;
  const lapNode = document.createElement('div');
  lapNode.textContent = `Lap ${lapCounter++}: ${formatTime(lapTime)}`;
  lapsDisplay.prepend(lapNode);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = time % 1000;
  return `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds, true)}`;
}

function reset() {
  clearInterval(timerInterval);
  timerInterval = null;
  elapsedTime = 0;
  laps = [];
  lapCounter = 1;
  startStopButton.textContent = 'Start';
  updateDisplay();
  lapsDisplay.innerHTML = '';
}
