const STORAGE_KEY = 'pomodoroSessionCount';
const WORK_SECONDS = 25 * 60;
const BREAK_SECONDS = 5 * 60;

const state = {
  currentMode: 'work',
  secondsRemaining: WORK_SECONDS,
  timerId: null,
  isRunning: false,
  sessionCount: 0,
};

const dom = {};

function initApp() {
  cacheDom();
  bindEvents();
  state.sessionCount = loadSessionCount();
  updateSessionCounter();
  updateDisplay(state.secondsRemaining);
}

function cacheDom() {
  dom.modeLabel = document.getElementById('mode-label');
  dom.timerDisplay = document.getElementById('timer-display');
  dom.progressRing = document.getElementById('progress-ring');
  dom.sessionCount = document.getElementById('session-count');
  dom.startButton = document.getElementById('start-button');
  dom.pauseButton = document.getElementById('pause-button');
  dom.resumeButton = document.getElementById('resume-button');
  dom.resetButton = document.getElementById('reset-button');
}

function bindEvents() {
  dom.startButton.addEventListener('click', startTimer);
  dom.pauseButton.addEventListener('click', pauseTimer);
  dom.resumeButton.addEventListener('click', resumeTimer);
  dom.resetButton.addEventListener('click', resetTimer);
}

function loadSessionCount() {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? Number(saved) : 0;
}

function saveSessionCount(count) {
  localStorage.setItem(STORAGE_KEY, String(count));
}

function incrementSessionCount() {
  state.sessionCount += 1;
  saveSessionCount(state.sessionCount);
  updateSessionCounter();
}

function setMode(mode) {
  state.currentMode = mode;
  state.secondsRemaining = getTotalSecondsForMode(mode);
  dom.modeLabel.textContent = mode === 'work' ? 'Work' : 'Break';
  updateDisplay(state.secondsRemaining);
}

function startTimer() {
  if (state.isRunning || state.timerId !== null) {
    return;
  }

  state.isRunning = true;
  state.timerId = window.setInterval(timerTick, 1000);
}

function pauseTimer() {
  // Pause logic will be implemented later.
}

function resumeTimer() {
  // Resume logic will be implemented later.
}

function resetTimer() {
  // Reset logic will be implemented later.
}

function timerTick() {
  if (state.secondsRemaining <= 0) {
    return;
  }

  state.secondsRemaining -= 1;
  updateDisplay(state.secondsRemaining);

  if (state.secondsRemaining === 0) {
    window.clearInterval(state.timerId);
    state.timerId = null;
    state.isRunning = false;
    console.log('work complete');
  }
}

function updateDisplay(secondsRemaining) {
  dom.timerDisplay.textContent = formatTime(secondsRemaining);
}

function updateProgress(secondsRemaining, totalSeconds) {
  // Progress update logic will be implemented later.
}

function updateSessionCounter() {
  dom.sessionCount.textContent = String(state.sessionCount);
}

function playTransitionSound() {
  // Sound playback will be implemented later.
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`;
}

function getTotalSecondsForMode(mode) {
  return mode === 'work' ? WORK_SECONDS : BREAK_SECONDS;
}

document.addEventListener('DOMContentLoaded', initApp);
