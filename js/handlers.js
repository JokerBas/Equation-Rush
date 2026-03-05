// js/handlers.js
// Submit handler และ helper สำหรับสร้าง custom game config

import { state } from './state.js';
import { dom } from './dom.js';
import { TRANSLATIONS, LEVELS } from './config.js';
import { validateEquation } from './validation.js';
import { stopTimer, startTimer, startStopwatch } from './timer.js';
import { saveScore } from './leaderboard.js';

function resumeTimer() {
    if (state.gameMode === 'custom') {
        startStopwatch();
    } else {
        startTimer(state.timeRemaining);
    }
}

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
        resumeTimer();
        return;
    }

    const result = validateEquation(equation);

    if (result === t.success) {
        dom.resultTextEl.textContent = result;
        dom.resultTextEl.className = 'success';
        dom.submitButton.disabled = true;

        if (state.gameMode === 'custom') {
            // Sandbox: ไม่ disable shuffle — ผู้เล่นสามารถ shuffle เพื่อเล่นปริศนาต่อได้
            // คำนวณคะแนนความเร็ว: ยิ่งเร็วยิ่งได้เยอะ
            const speedScore = Math.max(50, 600 - state.elapsedTime);
            state.currentScore += speedScore;
            dom.currentScoreEl.textContent = state.currentScore;

            // แสดงเวลาที่ใช้
            const m = String(Math.floor(state.elapsedTime / 60)).padStart(2, '0');
            const s = String(state.elapsedTime % 60).padStart(2, '0');
            dom.resultTextEl.textContent += ` ${t.sandbox_time_result(`${m}:${s}`)}`;

            // บันทึกลง Leaderboard
            saveScore('sandbox', {
                time: state.elapsedTime,
                target: state.targetNumber,
                date: new Date().toLocaleDateString(),
            });

            dom.nextLevelButton.style.display = 'none';
            dom.backToLevelsButton.style.display = 'block';
        } else {
            // Solo mode
            dom.shuffleButton.disabled = true;
            state.currentScore += state.currentLevel * 100 + state.timeRemaining;
            dom.currentScoreEl.textContent = state.currentScore;

            const isLastLevel = state.currentLevel >= LEVELS.length;
            if (!isLastLevel) {
                dom.nextLevelButton.style.display = 'block';
                dom.backToLevelsButton.style.display = 'none';
            } else {
                dom.resultTextEl.textContent += ` ${t.final_win}`;
                dom.nextLevelButton.style.display = 'none';
                dom.backToLevelsButton.style.display = 'block';

                // บันทึกลง Solo Leaderboard เมื่อผ่านครบทุกด่าน
                saveScore('solo', {
                    score: state.currentScore,
                    maxLevel: state.currentLevel,
                    date: new Date().toLocaleDateString(),
                });
            }
        }
    } else {
        dom.resultTextEl.textContent = `ERROR: ${result}`;
        dom.resultTextEl.className = 'error';
        document.querySelectorAll('.number-button').forEach(btn => btn.disabled = false);
        resumeTimer();
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
