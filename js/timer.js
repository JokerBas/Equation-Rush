// js/timer.js
// ฟังก์ชันจัดการตัวจับเวลา: countdown (solo) และ stopwatch (sandbox)

import { state } from './state.js';
import { dom } from './dom.js';
import { TRANSLATIONS } from './config.js';

// --- Countdown (Solo Mode) ---
export function updateTimerDisplay() {
    const minutes = Math.floor(state.timeRemaining / 60);
    const seconds = state.timeRemaining % 60;
    dom.timerDisplay.textContent = `⏳ ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function startTimer(duration) {
    clearInterval(state.timerInterval);
    state.timeRemaining = duration;
    updateTimerDisplay();

    state.timerInterval = setInterval(() => {
        state.timeRemaining--;
        updateTimerDisplay();
        if (state.timeRemaining <= 0) {
            clearInterval(state.timerInterval);
            handleTimeUp();
        }
    }, 1000);
}

// --- Stopwatch (Sandbox Mode) ---
export function updateStopwatchDisplay() {
    const minutes = Math.floor(state.elapsedTime / 60);
    const seconds = state.elapsedTime % 60;
    dom.timerDisplay.textContent = `⏱ ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function startStopwatch() {
    clearInterval(state.timerInterval);
    updateStopwatchDisplay();

    state.timerInterval = setInterval(() => {
        state.elapsedTime++;
        updateStopwatchDisplay();
    }, 1000);
}

// --- Shared ---
export function stopTimer() {
    clearInterval(state.timerInterval);
}

export function handleTimeUp() {
    const t = TRANSLATIONS[state.currentLanguage];
    dom.resultTextEl.textContent = t.time_up;
    dom.resultTextEl.className = 'error';
    dom.submitButton.disabled = true;
    dom.shuffleButton.disabled = true;
    dom.nextLevelButton.style.display = 'none';
    dom.backToLevelsButton.style.display = 'block';
}
