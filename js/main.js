// js/main.js
// Entry point: ผูก Event Listeners ทั้งหมด และ initialize เกม

import { state } from './state.js';
import { dom } from './dom.js';
import { LEVELS, TRANSLATIONS } from './config.js';
import { showScreen, setLanguage, showLevelScreen, showLeaderboardScreen } from './ui.js';
import { startGameForLevel, generateNewGame } from './puzzle.js';
import { handleSubmit, buildCustomConfig } from './handlers.js';
import { stopTimer } from './timer.js';
import { insertAtCaret } from './utils.js';
import { clearScores } from './leaderboard.js';
import { initScratchpad } from './scratchpad.js';
import { initAntiCheat } from './anticheat.js';

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

    // --- Leaderboard ---
    if (dom.leaderboardButton) dom.leaderboardButton.addEventListener('click', showLeaderboardScreen);
    if (dom.backFromLeaderboard) dom.backFromLeaderboard.addEventListener('click', () => showScreen(dom.menuScreen));

    // Tab switching inside leaderboard
    dom.lbTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            dom.lbTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const mode = tab.getAttribute('data-mode');
            document.querySelectorAll('.lb-content').forEach(c => c.classList.remove('active'));
            const target = document.getElementById(`lb-${mode}`);
            if (target) target.classList.add('active');
        });
    });

    // Clear leaderboard
    if (dom.lbClearButton) dom.lbClearButton.addEventListener('click', () => {
        const t = TRANSLATIONS[state.currentLanguage];
        if (confirm(t.lb_clear_confirm)) {
            clearScores();
            showLeaderboardScreen();
        }
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
        // Sandbox: reset stopwatch (new puzzle = new timing challenge)
        // Solo: maintain remaining time
        const maintainTime = state.gameMode !== 'custom';
        generateNewGame(currentConfig, maintainTime);
    });

    // --- Math Symbol Buttons ---
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
    });
}

// Initialize
addEventListeners();
initScratchpad();
initAntiCheat();
setLanguage(state.currentLanguage);
showScreen(dom.menuScreen);
