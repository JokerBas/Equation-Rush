// js/leaderboard.js
// จัดการ Leaderboard ด้วย localStorage
// ป้องกัน tamper ด้วย simple hash (client-side security layer)

const STORAGE_KEY = 'eq_rush_lb_v1';
const MAX_ENTRIES = 10;

// Simple hash เพื่อตรวจจับการแก้ไข localStorage โดยตรง
function hashEntry(obj) {
    const str = JSON.stringify(obj) + ':EQR_SECRET_2025';
    let h = 0;
    for (let i = 0; i < str.length; i++) {
        h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
    }
    return h.toString(36);
}

function readData() {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch {
        return {};
    }
}

function writeData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Solo entry: { score, maxLevel, date }
// Sandbox entry: { time (seconds), target, date }
export function saveScore(mode, entry) {
    const data = readData();
    if (!data[mode]) data[mode] = [];

    const signed = { ...entry, _h: hashEntry(entry) };
    data[mode].push(signed);

    // กรองรายการที่ถูกแก้ไข, เรียง, เก็บ top MAX_ENTRIES
    data[mode] = data[mode]
        .filter(e => { const { _h, ...rest } = e; return _h === hashEntry(rest); })
        .sort(mode === 'solo' ? (a, b) => b.score - a.score : (a, b) => a.time - b.time)
        .slice(0, MAX_ENTRIES);

    writeData(data);
}

export function getScores(mode) {
    const data = readData();
    return (data[mode] || []).filter(e => {
        const { _h, ...rest } = e;
        return _h === hashEntry(rest);
    });
}

export function clearScores() {
    localStorage.removeItem(STORAGE_KEY);
}
