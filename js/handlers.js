// js/handlers.js
// Submit handler และ helper สำหรับสร้าง custom game config

import { state } from './state.js';
import { dom } from './dom.js';
import { TRANSLATIONS, LEVELS } from './config.js';
import { validateEquation } from './validation.js';
import { stopTimer, startTimer } from './timer.js';

export function handleSubmit() {
    const t = TRANSLATIONS[state.currentLanguage];
    const equation = dom.equationInput.value.trim();

    // ตรวจสอบว่าใช้ตัวเลขครบทุกตัวก่อน
    const allButtons = Array.from(dom.inputNumbersContainer.querySelectorAll('.number-button'));
    const unusedButtons = allButtons.filter(btn => !btn.disabled);
    if (unusedButtons.length > 0) {
        const msg = state.currentLanguage === 'th'
            ? `ต้องใช้ตัวเลขให้ครบทุกตัว! (เหลืออีก ${unusedButtons.length} ตัว)`
            : `Use all numbers! (${unusedButtons.length} left)`;
        dom.resultTextEl.textContent = msg;
        dom.resultTextEl.className = 'error';
        return;
    }

    stopTimer();

    if (!equation) {
        dom.resultTextEl.textContent = t.placeholder;
        dom.resultTextEl.className = 'error';
        startTimer(state.timeRemaining);
        return;
    }

    const result = validateEquation(equation);

    if (result === t.success) {
        dom.resultTextEl.textContent = result;
        dom.resultTextEl.className = 'success';
        dom.submitButton.disabled = true;
        dom.shuffleButton.disabled = true;

        state.currentScore += (state.gameMode === 'level' ? state.currentLevel : 1) * 100 + state.timeRemaining;
        dom.currentScoreEl.textContent = state.currentScore;

        const isLastLevel = state.gameMode !== 'level' || state.currentLevel >= LEVELS.length;
        if (!isLastLevel) {
            dom.nextLevelButton.style.display = 'block';
            dom.backToLevelsButton.style.display = 'none';
        } else {
            dom.resultTextEl.textContent += state.gameMode === 'level'
                ? ` ${t.final_win}`
                : ` (ยอดเยี่ยม! กด "สุ่มเลขใหม่" เพื่อเล่นต่อ)`;
            dom.nextLevelButton.style.display = 'none';
            dom.backToLevelsButton.style.display = 'block';
        }
    } else {
        dom.resultTextEl.textContent = `ERROR: ${result}`;
        dom.resultTextEl.className = 'error';
        document.querySelectorAll('.number-button').forEach(btn => btn.disabled = false);
        startTimer(state.timeRemaining);
    }
}

// สร้าง config object จาก setup screen สำหรับ Custom Mode
export function buildCustomConfig() {
    const targetType = dom.setupTargetType.value;
    const rangeMap = {
        '24':      { min: 24,   max: 24   },
        '2digits': { min: 10,   max: 99   },
        '3digits': { min: 100,  max: 999  },
        '4digits': { min: 1000, max: 9999 },
    };
    const targetRange = rangeMap[targetType] ?? rangeMap['2digits'];

    return {
        id: 'custom',
        targetDigits: targetType === '3digits' ? 3 : 2,
        numberCount: parseInt(dom.setupNumberCount.value),
        timeLimitSeconds: parseInt(dom.setupTime.value),
        targetRange,
    };
}
