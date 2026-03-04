// js/timer.js
// ฟังก์ชันจัดการตัวจับเวลา และ handleTimeUp

import { state } from './state.js';
import { dom } from './dom.js';
import { TRANSLATIONS } from './config.js';

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
