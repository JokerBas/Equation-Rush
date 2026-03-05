// js/anticheat.js
// ระบบป้องกัน/ตรวจจับพฤติกรรมการโกง (client-side layer)

import { state } from './state.js';
import { dom } from './dom.js';
import { TRANSLATIONS } from './config.js';
import { stopTimer, startTimer, startStopwatch } from './timer.js';

let tabSwitchedDuringGame = false;

export function initAntiCheat() {
    // 1. แสดงคำเตือนใน browser DevTools console
    console.log('%c⚠️ STOP!', 'color:red;font-size:52px;font-weight:bold;');
    console.log(
        '%cThis is a browser developer tool. Modifying game state via console will invalidate your score.',
        'color:darkorange;font-size:14px;'
    );

    // 2. ตรวจจับการเปลี่ยน tab หรือซ่อน window
    document.addEventListener('visibilitychange', handleVisibilityChange);
}

function handleVisibilityChange() {
    // ทำงานเฉพาะตอนกำลังเล่นเกมอยู่และยังไม่ได้ส่งคำตอบ
    if (!dom.gamePlayScreen.classList.contains('active')) return;
    if (dom.submitButton.disabled) return;

    if (document.hidden) {
        // ผู้เล่นออกจาก tab — หยุดเวลาทันที
        tabSwitchedDuringGame = true;
        stopTimer();
        const t = TRANSLATIONS[state.currentLanguage];
        dom.resultTextEl.textContent = t.cheat_tab;
        dom.resultTextEl.className = 'error';
    } else if (tabSwitchedDuringGame) {
        // ผู้เล่นกลับมา — เริ่มเวลาต่อ
        tabSwitchedDuringGame = false;
        if (state.gameMode === 'custom') {
            startStopwatch();
        } else {
            startTimer(state.timeRemaining);
        }
    }
}
