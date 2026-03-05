// js/ui.js
// ฟังก์ชัน UI: จัดการหน้าจอ, ภาษา, ปุ่มตัวเลข, Level Screen และ Leaderboard

import { state } from './state.js';
import { dom } from './dom.js';
import { TRANSLATIONS, LEVELS } from './config.js';
import { insertAtCaret } from './utils.js';
import { getScores } from './leaderboard.js';

export function showScreen(screen) {
    [dom.menuScreen, dom.levelScreen, dom.gamePlayScreen, dom.setupScreen, dom.leaderboardScreen].forEach(el => {
        if (el) el.classList.remove('active');
    });
    if (screen) screen.classList.add('active');
    // ปิด scratchpad ทุกครั้งที่เปลี่ยนหน้าจอ
    if (dom.scratchpadPanel) dom.scratchpadPanel.classList.remove('open');
}

export function setLanguage(lang) {
    state.currentLanguage = lang;
    const t = TRANSLATIONS[lang];

    const titleH1 = document.getElementById('title-h1');
    if (titleH1) titleH1.textContent = t.title;
    const subtitleP = document.getElementById('subtitle-p');
    if (subtitleP) subtitleP.textContent = t.subtitle;

    dom.equationInput.placeholder = t.placeholder;
    dom.currentScoreEl.textContent = state.currentScore;
    if (dom.scratchpadTextarea) dom.scratchpadTextarea.placeholder = t.scratchpad_placeholder;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        el.textContent = t[el.getAttribute('data-i18n')];
    });

    document.querySelectorAll('[data-i18n-prefix]').forEach(el => {
        const prefix = t[el.getAttribute('data-i18n-prefix')];
        const value = el.textContent.includes(':') ? el.textContent.split(': ')[1] : el.textContent;
        const safeValue = value || (el.id === 'level-display' ? '1' : '0');
        el.textContent = `${prefix} ${safeValue.trim()}`;
    });

    dom.mathSymbolButtons.forEach(button => {
        const symbol = button.getAttribute('data-symbol');
        if (symbol === 'fact(') button.textContent = t.factorial;
        else if (symbol === '**') button.textContent = t.power;
    });

    dom.langButtons.forEach(btn => btn.classList.remove('active'));
    const activeLangBtn = document.getElementById(`lang-${lang}`);
    if (activeLangBtn) activeLangBtn.classList.add('active');

    if (dom.gamePlayScreen.classList.contains('active')) {
        updateShuffleDisplay();
        dom.targetNumberEl.textContent = `${t.target_prefix} ${state.targetNumber}`;
        dom.levelDisplay.textContent = state.gameMode === 'custom'
            ? (lang === 'th' ? 'โหมด: กำหนดเอง' : 'Mode: Custom')
            : `${t.level_prefix} ${state.currentLevel}`;
    }

    if (dom.leaderboardScreen && dom.leaderboardScreen.classList.contains('active')) {
        _renderLeaderboard('solo');
        _renderLeaderboard('sandbox');
    }
}

export function updateShuffleDisplay() {
    const t = TRANSLATIONS[state.currentLanguage];
    if (state.shufflesRemaining > 0) {
        dom.shuffleLimitText.textContent = t.shuffle_limit(state.shufflesRemaining);
        dom.shuffleButton.disabled = false;
    } else {
        dom.shuffleLimitText.textContent = t.shuffle_exhausted;
        dom.shuffleButton.disabled = true;
    }
}

export function createNumberButtons() {
    dom.inputNumbersContainer.innerHTML = '';
    state.inputNumbers.forEach(number => {
        const button = document.createElement('button');
        button.textContent = number;
        button.classList.add('number-button');
        button.addEventListener('click', () => {
            insertAtCaret(dom.equationInput, String(number));
            button.disabled = true;
        });
        dom.inputNumbersContainer.appendChild(button);
    });
}

export function showLevelScreen() {
    showScreen(dom.levelScreen);
    const t = TRANSLATIONS[state.currentLanguage];
    const config = LEVELS.find(l => l.id === state.currentLevel);
    if (!config) {
        state.currentLevel = 1;
        return showLevelScreen();
    }

    dom.levelDescription.textContent = t[`level_${config.id}_desc`];
    dom.currentLevelTitle.textContent = `${t.level_prefix} ${config.id}`;
    dom.levelTargetRange.textContent = `${config.targetRange.min}-${config.targetRange.max}`;
    dom.levelNumberCount.textContent = config.numberCount;

    const minutes = Math.floor(config.timeLimitSeconds / 60);
    const seconds = config.timeLimitSeconds % 60;
    dom.levelTimeLimit.textContent = seconds > 0
        ? `${t.time_unit_min(minutes)} ${t.time_unit_sec(seconds)}`
        : t.time_unit_min(minutes);
}

export function showLeaderboardScreen() {
    showScreen(dom.leaderboardScreen);
    _renderLeaderboard('solo');
    _renderLeaderboard('sandbox');
}

function _renderLeaderboard(mode) {
    const t = TRANSLATIONS[state.currentLanguage];
    const scores = getScores(mode);
    const container = mode === 'solo' ? dom.lbSoloContent : dom.lbSandboxContent;
    if (!container) return;

    if (scores.length === 0) {
        container.innerHTML = `<p class="lb-empty">${t.lb_empty}</p>`;
        return;
    }

    if (mode === 'solo') {
        const rows = scores.map((e, i) => `
            <tr class="${i === 0 ? 'lb-gold' : ''}">
                <td>${i + 1}</td>
                <td>${e.score.toLocaleString()}</td>
                <td>${e.maxLevel}</td>
                <td>${e.date}</td>
            </tr>`).join('');
        container.innerHTML = `
            <table class="lb-table">
                <thead><tr><th>#</th><th>${t.lb_score}</th><th>${t.lb_level}</th><th>${t.lb_date}</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>`;
    } else {
        const rows = scores.map((e, i) => {
            const m = String(Math.floor(e.time / 60)).padStart(2, '0');
            const s = String(e.time % 60).padStart(2, '0');
            return `
            <tr class="${i === 0 ? 'lb-gold' : ''}">
                <td>${i + 1}</td>
                <td>${m}:${s}</td>
                <td>${e.target}</td>
                <td>${e.date}</td>
            </tr>`;
        }).join('');
        container.innerHTML = `
            <table class="lb-table">
                <thead><tr><th>#</th><th>${t.lb_time_col}</th><th>Target</th><th>${t.lb_date}</th></tr></thead>
                <tbody>${rows}</tbody>
            </table>`;
    }
}
