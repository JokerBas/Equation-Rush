// js/puzzle.js
// สร้างปริศนาเกมใหม่ผ่าน Web Worker และเริ่มเกมตามด่าน

import { state } from './state.js';
import { dom } from './dom.js';
import { TRANSLATIONS, LEVELS } from './config.js';
import { showScreen, createNumberButtons, updateShuffleDisplay } from './ui.js';
import { startTimer, stopTimer } from './timer.js';

export function generateNewGame(levelConfig, maintainTime = false) {
    const t = TRANSLATIONS[state.currentLanguage];

    if (state.activeWorker) {
        state.activeWorker.terminate();
    }

    // แสดง loading state
    dom.targetNumberEl.textContent = '...';
    dom.targetNumberEl.classList.remove('target-number');
    dom.targetNumberEl.classList.add('loading-text');
    dom.inputNumbersContainer.innerHTML = 'Finding Solvable Puzzle...';
    dom.resultTextEl.textContent = 'Loading...';
    dom.submitButton.disabled = true;
    dom.shuffleButton.disabled = true;

    state.activeWorker = new Worker('solver_worker.js');
    state.activeWorker.postMessage({ levelConfig });

    state.activeWorker.onmessage = function(e) {
        const { solvable, targetNumber: newTarget, inputNumbers: newNumbers, attempts, timeTaken, solutions } = e.data;

        console.log(`[Worker] Checked ${attempts} patterns in ${timeTaken}ms`);
        console.log(`[Worker] Found ${solutions.length} solutions. Examples:`, solutions);

        state.targetNumber = newTarget;
        state.inputNumbers = newNumbers;

        dom.targetNumberEl.textContent = `${t.target_prefix} ${state.targetNumber}`;
        dom.targetNumberEl.classList.add('target-number');
        dom.targetNumberEl.classList.remove('loading-text');
        createNumberButtons();

        dom.resultTextEl.textContent = solvable ? '' : `Warning: Check failed after ${attempts} attempts.`;
        dom.equationInput.value = '';
        dom.submitButton.disabled = false;
        dom.nextLevelButton.style.display = 'none';
        dom.backToLevelsButton.style.display = 'none';
        dom.equationInput.focus();

        updateShuffleDisplay();

        stopTimer();
        startTimer(maintainTime ? state.timeRemaining : levelConfig.timeLimitSeconds);

        state.activeWorker.terminate();
        state.activeWorker = null;
    };

    state.activeWorker.onerror = function(err) {
        console.error('Worker Error:', err);
        alert('Critical Error with Worker. Please refresh.');
        showScreen(dom.menuScreen);
    };
}

export function startGameForLevel(level) {
    const t = TRANSLATIONS[state.currentLanguage];
    const levelConfig = LEVELS.find(l => l.id === level);
    if (!levelConfig) return;

    state.currentLevel = level;
    state.gameMode = 'level';
    dom.levelDisplay.textContent = `${t.level_prefix} ${state.currentLevel}`;
    showScreen(dom.gamePlayScreen);

    state.shufflesRemaining = 2;
    generateNewGame(levelConfig, false);
}
