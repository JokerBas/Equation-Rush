// js/validation.js
// ตรวจสอบความถูกต้องของสมการที่ผู้เล่นป้อน

import { state } from './state.js';
import { TRANSLATIONS } from './config.js';
import { fact, compareResult } from './utils.js';

export function validateEquation(equation) {
    const t = TRANSLATIONS[state.currentLanguage];
    let calculatedValue;

    try {
        calculatedValue = new Function('fact', `return ${equation}`)(fact);
    } catch (e) {
        return t.error_format;
    }

    if (!isFinite(calculatedValue) || isNaN(calculatedValue)) {
        return t.error_result_nan;
    }

    if (!compareResult(calculatedValue, state.targetNumber)) {
        return t.error_result_mismatch(calculatedValue.toFixed(2), state.targetNumber);
    }

    // ตรวจสอบว่าใช้ตัวเลขถูกต้องและไม่ซ้ำเกิน
    const allowedCopy = [...state.inputNumbers];
    const sanitized = equation.replace(/(Math\.sqrt|fact)\s*\((.*?)\)/g, '()');
    const usedNumbers = (sanitized.match(/\d+/g) || []).map(Number);

    for (const num of usedNumbers) {
        const index = allowedCopy.indexOf(num);
        if (index > -1) {
            allowedCopy.splice(index, 1);
        } else {
            return t.error_usage;
        }
    }

    return t.success;
}
