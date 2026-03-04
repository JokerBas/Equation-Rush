// js/main.js
// Entry point: ผูก Event Listeners ทั้งหมด และ initialize เกม

import { state } from './state.js';
import { dom } from './dom.js';
import { LEVELS } from './config.js';
import { showScreen, setLanguage, showLevelScreen } from './ui.js';
import { startGameForLevel, generateNewGame } from './puzzle.js';
import { handleSubmit, buildCustomConfig } from './handlers.js';
import { stopTimer } from './timer.js';
import { insertAtCaret } from './utils.js';

function addEventListeners() {

    // --- Solo Mode ---
    if (dom.soloModeButton) dom.soloModeButton.addEventListener('click', () => {
        state.gameMode = 'level';
        state.currentLevel = 1;
        state.currentScore = 0;
        dom.currentScoreEl.textContent = 0;
        showLevelScreen();
    });

    // --- Navigation ---
    if (dom.backToMenuButton) dom.backToMenuButton.addEventListener('click', () => showScreen(dom.menuScreen));
    if (dom.startLevelButton) dom.startLevelButton.addEventListener('click', () => startGameForLevel(state.currentLevel));

    if (dom.nextLevelButton) dom.nextLevelButton.addEventListener('click', () => {
        state.currentLevel++;
        startGameForLevel(state.currentLevel);
    });

    if (dom.backToLevelsButton) dom.backToLevelsButton.addEventListener('click', () => {
        stopTimer();
        showScreen(dom.menuScreen);
    });

    // --- Custom Mode ---
    if (dom.customModeButton) dom.customModeButton.addEventListener('click', () => showScreen(dom.setupScreen));
    if (dom.backFromSetupButton) dom.backFromSetupButton.addEventListener('click', () => showScreen(dom.menuScreen));

    if (dom.startCustomGameButton) dom.startCustomGameButton.addEventListener('click', () => {
        state.gameMode = 'custom';
        const customConfig = buildCustomConfig();
        dom.levelDisplay.textContent = state.currentLanguage === 'th' ? 'โหมด: กำหนดเอง' : 'Mode: Custom';
        dom.nextLevelButton.style.display = 'none';
        dom.backToLevelsButton.style.display = 'block';
        showScreen(dom.gamePlayScreen);
        state.shufflesRemaining = 99;
        generateNewGame(customConfig, false);
    });

    // --- Submit ---
    dom.submitButton.addEventListener('click', handleSubmit);

    // --- Shuffle ---
    dom.shuffleButton.addEventListener('click', () => {
        if (state.shufflesRemaining <= 0) return;
        state.shufflesRemaining--;
        stopTimer();
        const currentConfig = state.gameMode === 'custom'
            ? buildCustomConfig()
            : LEVELS.find(l => l.id === state.currentLevel);
        generateNewGame(currentConfig, true); // true = ใช้เวลาเดิม
    });

    // --- Math Symbol Buttons ---
    // data-symbol คือ text ที่จะ insert โดยตรง (fact(, root2(, **, (, ) ฯลฯ)
    dom.mathSymbolButtons.forEach(button => {
        button.addEventListener('click', () => {
            insertAtCaret(dom.equationInput, button.getAttribute('data-symbol'));
        });
    });

    // --- Enter key to submit ---
    dom.equationInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !dom.submitButton.disabled) {
            e.preventDefault();
            handleSubmit();
        }
    });

    // --- Language toggle ---
    dom.langButtons.forEach(button => {
        button.addEventListener('click', () => setLanguage(button.getAttribute('data-lang')));
    });

    // --- Keyboard shortcuts (ใช้งานได้เฉพาะหน้าจอเกม) ---
    window.addEventListener('keydown', (e) => {
        if (!dom.gamePlayScreen.classList.contains('active')) return;

        const key = e.key;

        if (/^[1-9]$/.test(key)) {
            const buttons = Array.from(dom.inputNumbersContainer.querySelectorAll('.number-button'));
            const target = buttons.find(btn => btn.textContent === key && !btn.disabled);
            if (target) {
                e.preventDefault();
                target.click();
            }
        } else if (key === '!') {
            e.preventDefault();
            insertAtCaret(dom.equationInput, 'fact(');
        } else if (key === 'r' || key === 'R') {
            e.preventDefault();
            insertAtCaret(dom.equationInput, 'root2(');
        } else if (key === '^') {
            e.preventDefault();
            insertAtCaret(dom.equationInput, '**');
        }
        // + - * / ( ) ปล่อยให้ browser จัดการตามปกติ
    });
}

// Initialize
addEventListeners();
setLanguage(state.currentLanguage);
showScreen(dom.menuScreen);
