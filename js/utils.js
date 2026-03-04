// js/utils.js
// ฟังก์ชัน Utility ทั่วไป: คณิตศาสตร์ และ DOM helper
// ไม่มี dependency กับโมดูลอื่น

export function fact(n) {
    if (n < 0 || !Number.isInteger(n)) return NaN;
    if (n === 0 || n === 1) return 1;
    if (n > 7) return NaN;
    let result = 1;
    for (let i = 2; i <= n; i++) { result *= i; }
    return result;
}

export function compareResult(a, b) {
    return Math.abs(a - b) < 0.001;
}

export function insertAtCaret(inputElement, text) {
    const start = inputElement.selectionStart;
    const end = inputElement.selectionEnd;
    const value = inputElement.value;
    inputElement.value = value.substring(0, start) + text + value.substring(end);
    const newPos = start + text.length;
    inputElement.selectionStart = newPos;
    inputElement.selectionEnd = newPos;
    inputElement.focus();
}
