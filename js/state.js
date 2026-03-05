// js/state.js
// Game state — object กลางที่เก็บสถานะทั้งหมดของเกม
// โมดูลอื่นๆ import object นี้ และแก้ไข property โดยตรง

export const state = {
    targetNumber: 0,
    inputNumbers: [],
    currentLevel: 1,
    timeRemaining: 0,    // countdown (solo mode)
    elapsedTime: 0,      // stopwatch (sandbox mode)
    gameStartTime: 0,    // timestamp เมื่อปริศนาเริ่ม (anti-cheat reference)
    timerInterval: null,
    shufflesRemaining: 2,
    currentLanguage: 'th',
    currentScore: 0,
    gameMode: 'level',   // 'level' | 'custom'
    activeWorker: null,
};
