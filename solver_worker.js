// solver_worker.js — Forward Generation
//
// แนวคิด (ทำงานไวกว่าเดิมมาก):
//   เดิม: สุ่ม target → สุ่มเลข → backtracking ค้นหาว่าแก้ได้ไหม (ช้า, worst-case 50k ครั้ง)
//   ใหม่: สุ่มเลข → สร้างสมการสุ่มจากเลขเหล่านั้น → ผลลัพธ์ = target
//         ถ้าผลอยู่ใน range ที่ต้องการ = เจอทันที (guarantee ว่าแก้ได้เสมอ)

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// สร้างสมการสุ่มจาก numbers แล้วคืน { val, str }
function buildEquation(numbers) {
    // แปลงเป็น object แล้วสุ่มลำดับ
    let operands = shuffle(numbers.map(n => ({ val: n, str: String(n) })));

    while (operands.length > 1) {
        const b = operands.pop();
        const a = operands.pop();

        // รวบรวม operations ที่เป็นไปได้
        const candidates = [
            { val: a.val + b.val, str: `(${a.str}+${b.str})` },
            { val: a.val - b.val, str: `(${a.str}-${b.str})` },
            { val: b.val - a.val, str: `(${b.str}-${a.str})` },
            { val: a.val * b.val, str: `(${a.str}*${b.str})` },
        ];
        if (b.val !== 0) candidates.push({ val: a.val / b.val, str: `(${a.str}/${b.str})` });
        if (a.val !== 0) candidates.push({ val: b.val / a.val, str: `(${b.str}/${a.str})` });

        // เลือก operation ที่ให้ผลลัพธ์ finite
        const valid = candidates.filter(c => isFinite(c.val));
        const chosen = valid.length > 0
            ? valid[Math.floor(Math.random() * valid.length)]
            : { val: a.val + b.val, str: `(${a.str}+${b.str})` }; // fallback

        operands.push(chosen);
    }

    return operands[0];
}

onmessage = function(e) {
    const { levelConfig } = e.data;
    const { numberCount, targetRange } = levelConfig;
    const startTime = performance.now();
    let attempts = 0;

    while (attempts < 10000) {
        attempts++;

        // สุ่มเลข input (1-9)
        const numbers = Array.from(
            { length: numberCount },
            () => Math.floor(Math.random() * 9) + 1
        );

        // ลอง 5 โครงสร้างสมการต่างกันสำหรับชุดเลขเดียวกัน
        // (amortize cost ของการสุ่มเลขใหม่)
        for (let t = 0; t < 5; t++) {
            const result = buildEquation(numbers);
            const target = Math.round(result.val);

            if (
                isFinite(result.val) &&
                Math.abs(result.val - target) < 0.001 &&
                target >= targetRange.min &&
                target <= targetRange.max
            ) {
                postMessage({
                    solvable: true,
                    targetNumber: target,
                    inputNumbers: numbers,
                    attempts,
                    timeTaken: (performance.now() - startTime).toFixed(2),
                    solutions: [result.str],
                });
                return;
            }
        }
    }

    // Fallback (ไม่ควรเกิดขึ้นในการเล่นปกติ)
    postMessage({
        solvable: false,
        targetNumber: targetRange.min,
        inputNumbers: Array.from({ length: numberCount }, () => Math.floor(Math.random() * 9) + 1),
        attempts,
        timeTaken: (performance.now() - startTime).toFixed(2),
        solutions: [],
    });
};
