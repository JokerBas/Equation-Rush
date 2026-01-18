// solver_worker.js

function fact(n) {
    if (n < 0 || !Number.isInteger(n) || n > 7) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) result *= i;
    return result;
}

function compareResult(a, b) { return Math.abs(a - b) < 0.001; }

// ฟังก์ชันหาคำตอบและเก็บรูปแบบสมการ
function findSolutions(numbers, target) {
    let results = [];
    if (numbers.length === 1) {
        if (compareResult(numbers[0].val, target)) return [numbers[0].str];
        return [];
    }

    for (let i = 0; i < numbers.length; i++) {
        for (let j = i + 1; j < numbers.length; j++) {
            const a = numbers[i];
            const b = numbers[j];
            const rest = numbers.filter((_, idx) => idx !== i && idx !== j);

            let ops = [
                { val: a.val + b.val, str: `(${a.str}+${b.str})` },
                { val: a.val - b.val, str: `(${a.str}-${b.str})` },
                { val: b.val - a.val, str: `(${b.str}-${a.str})` },
                { val: a.val * b.val, str: `(${a.str}*${b.str})` }
            ];
            if (b.val !== 0) ops.push({ val: a.val / b.val, str: `(${a.str}/${b.str})` });
            if (a.val !== 0) ops.push({ val: b.val / a.val, str: `(${b.str}/${a.str})` });

            for (let op of ops) {
                if (isFinite(op.val)) {
                    let subSolved = findSolutions([...rest, op], target);
                    if (subSolved.length > 0) {
                        results.push(...subSolved);
                        if (results.length >= 2) return results; // เจอ 2 วิธีแล้วหยุดทันที
                    }
                }
            }
        }
    }
    return results;
}

onmessage = function(e) {
    const { levelConfig } = e.data;
    const startTime = performance.now();
    let attempts = 0, foundSolutions = [];
    let targetNumber, inputNumbers;

    while (foundSolutions.length < 2 && attempts < 50000) {
        attempts++;
        targetNumber = Math.floor(Math.random() * (levelConfig.targetRange.max - levelConfig.targetRange.min + 1)) + levelConfig.targetRange.min;
        inputNumbers = Array.from({length: levelConfig.numberCount}, () => Math.floor(Math.random() * 9) + 1);
        
        let numsObj = inputNumbers.map(n => ({ val: n, str: n.toString() }));
        foundSolutions = findSolutions(numsObj, targetNumber);
    }

    postMessage({
        solvable: foundSolutions.length >= 2,
        targetNumber,
        inputNumbers,
        attempts,
        timeTaken: (performance.now() - startTime).toFixed(2),
        solutions: foundSolutions
    });
};