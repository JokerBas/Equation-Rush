// game.js

// === 1. โครงสร้างข้อมูลภาษา (i18n) ===
const TRANSLATIONS = {
    th: {
        title: "Equation Rush",
        subtitle: "180 IQ",
        mode_title: "โหมดการเล่น",
        custom_mode: "⚙️ Sandbox Mode",
        setup_title: "ตั้งค่าเกม",
        select_target: "เป้าหมาย (Target)",
        select_numbers: "จำนวนตัวเลข",
        select_time: "เวลาจำกัด",
        start_game: "เริ่มเกม",
        solo_mode: "👤 เล่นคนเดียว (Solo)",
        multi_mode: "👥 เล่นหลายคน (Coming Soon)",
        solo_info: 'เลือก "เล่นคนเดียว" เพื่อเข้าสู่โหมดด่าน',
        level_prefix: "ด่าน:",
        score_prefix: "คะแนน:",
        target: "🎯 เป้าหมาย",
        numbers: "🔢 ตัวเลข",
        numbers_unit: "ตัว",
        time_limit: "⏳ เวลา",
        start_level: "เริ่มด่านนี้!",
        back_menu: "ย้อนกลับเมนูหลัก",
        target_prefix: "เป้าหมาย:",
        placeholder: "สมการของคุณ เช่น (5*10) + 8",
        submit: "ส่งคำตอบ",
        shuffle: "สุ่มเลขใหม่",
        shuffle_limit: (count) => `สิทธิ์สุ่มใหม่: ${count} 🎫`,
        shuffle_exhausted: "สิทธิ์หมด! 🍀", 
        next_level: "▶️ ไปด่านถัดไป",
        success: "สมการถูกต้องและใช้ตัวเลขได้ครบ",
        error_format: "Syntax Error: รูปแบบสมการไม่ถูกต้อง",
        error_result_nan: `Incorrect Result: สมการได้ผลลัพธ์ที่ไม่ถูกต้อง (NaN/Infinity).`,
        error_result_mismatch: (calc, target) => `Incorrect Result: สมการได้ ${calc} แต่ควรเป็น ${target}.`,
        error_usage: "Number Usage Error: คุณใช้ตัวเลขไม่ได้รับอนุญาตหรือใช้ซ้ำมากเกินไป",
        time_up: "หมดเวลา! ลองใหม่นะ.",
        final_win: "คุณเก่งมาก! ผ่านครบทุกด่านแล้ว!",
        time_unit_min: (n) => `${n} นาที`,
        time_unit_sec: (n) => `${n} วินาที`,
        power: "^",
        sqrt: "√",
        factorial: "!",
        level_1_desc: "เริ่มต้น: เป้าหมาย 2 หลัก, ใช้เลข 5 ตัว, 3 นาที",
        level_2_desc: "ลดเวลา: เป้าหมาย 2 หลัก, ใช้เลข 5 ตัว, 2:45 นาที",
        level_3_desc: "ลดตัวเลข: เป้าหมาย 2 หลัก, ใช้เลข 4 ตัว, 2 นาที",
        level_4_desc: "กดดันเวลา: เป้าหมาย 2 หลัก, ใช้เลข 4 ตัว, 1:30 นาที",
        level_5_desc: "เพิ่มความยาก: เป้าหมาย 3 หลัก (100-499), 5 ตัวเลข, 3 นาที",
        level_6_desc: "กดดัน: เป้าหมาย 3 หลัก (100-499), 5 ตัวเลข, 2:45 นาที",
        level_7_desc: "ยากขึ้น: เป้าหมาย 3 หลัก (100-499), 5 ตัวเลข, 2 นาที",
        level_8_desc: "ยากที่สุด: เป้าหมาย 3 หลัก (500-999), 5 ตัวเลข, 1:30 นาที",
        level_9_desc: "ทดสอบสุดท้าย: เป้าหมาย 3 หลัก (500-999), 5 ตัวเลข, 1:30 นาที",
        level_10_desc: "THE FINAL CHALLENGE: เป้าหมาย 3 หลัก (500-999), 5 ตัวเลข, 1:30 นาที",
    },
    en: {
        title: "Equation Rush",
        subtitle: "180 IQ",
        mode_title: "Game Modes",
        solo_mode: "👤 Solo Play",
        custom_mode: "⚙️ Sandbox Mode",
        setup_title: "Game Setup",
        select_target: "Target Type",
        select_numbers: "Number Count",
        select_time: "Time Limit",
        start_game: "Start Game",
        multi_mode: "👥 Multiplayer (Coming Soon)",
        solo_info: 'Select "Solo Play" to enter Level Mode.',
        level_prefix: "Level:",
        score_prefix: "Score:",
        target: "🎯 Target",
        numbers: "🔢 Numbers",
        numbers_unit: "units",
        time_limit: "⏳ Time",
        start_level: "Start Level!",
        back_menu: "Back to Main Menu",
        target_prefix: "TARGET:",
        placeholder: "Your equation, e.g., (5*10) + 8",
        submit: "Submit Answer",
        shuffle: "Shuffle Numbers",
        shuffle_limit: (count) => `Shuffle Tickets: ${count} 🎫`,
        shuffle_exhausted: "Tickets Exhausted! 🍀",
        next_level: "▶️ Next Level",
        success: "Equation is correct and numbers are used properly.",
        error_format: "Syntax Error: Invalid Equation Format.",
        error_result_nan: `Incorrect Result: Equation leads to an invalid number (NaN/Infinity).`,
        error_result_mismatch: (calc, target) => `Incorrect Result: Equation equals ${calc}, but should be ${target}.`,
        error_usage: "Number Usage Error: You used an unauthorized number or used one too many times.",
        time_up: "TIME UP! Try again.",
        final_win: "Congratulations! You completed all levels!",
        time_unit_min: (n) => `${n} min`,
        time_unit_sec: (n) => `${n} sec`,
        power: "^",
        sqrt: "√",
        factorial: "!",
        level_1_desc: "Easy Start: 2-digit target, 5 numbers, 3 minutes.",
        level_2_desc: "Time Reduction: 2-digit target, 5 numbers, 2:45 minutes.",
        level_3_desc: "Fewer Numbers: 2-digit target, 4 numbers, 2 minutes.",
        level_4_desc: "Time Pressure: 2-digit target, 4 numbers, 1:30 minutes.",
        level_5_desc: "Difficulty Up: 3-digit target (100-499), 5 numbers, 3 minutes.",
        level_6_desc: "Pressure: 3-digit target (100-499), 5 numbers, 2:45 minutes.",
        level_7_desc: "Harder: 3-digit target (100-499), 5 numbers, 2 minutes.",
        level_8_desc: "Hardest: 3-digit target (500-999), 5 numbers, 1:30 minutes.",
        level_9_desc: "Final Test: 3-digit target (500-999), 5 numbers, 1:30 minutes.",
        level_10_desc: "THE FINAL CHALLENGE: 3-digit target (500-999), 5 numbers, 1:30 minutes.",
    }
};

// === 2. การกำหนดค่าคงที่สำหรับด่าน ===
const LEVELS = [
    { id: 1, targetDigits: 2, numberCount: 5, timeLimitSeconds: 180, targetRange: { min: 10, max: 99 } },
    { id: 2, targetDigits: 2, numberCount: 5, timeLimitSeconds: 165, targetRange: { min: 10, max: 99 } },
    { id: 3, targetDigits: 2, numberCount: 4, timeLimitSeconds: 120, targetRange: { min: 10, max: 99 } },
    { id: 4, targetDigits: 2, numberCount: 4, timeLimitSeconds: 90, targetRange: { min: 10, max: 99 } },
    { id: 5, targetDigits: 3, numberCount: 5, timeLimitSeconds: 180, targetRange: { min: 100, max: 499 } },
    { id: 6, targetDigits: 3, numberCount: 5, timeLimitSeconds: 165, targetRange: { min: 100, max: 499 } },
    { id: 7, targetDigits: 3, numberCount: 5, timeLimitSeconds: 120, targetRange: { min: 100, max: 499 } },
    { id: 8, targetDigits: 3, numberCount: 5, timeLimitSeconds: 90, targetRange: { min: 500, max: 999 } },
    { id: 9, targetDigits: 3, numberCount: 5, timeLimitSeconds: 90, targetRange: { min: 500, max: 999 } },
    { id: 10, targetDigits: 3, numberCount: 5, timeLimitSeconds: 90, targetRange: { min: 500, max: 999 } },
];


// === 3. ตัวแปรสำหรับเก็บสถานะเกม ===
let targetNumber = 0;
let inputNumbers = [];
let currentLevel = 1;
let timeRemaining = 0;
let timerInterval = null;
let shufflesRemaining = 2; 
let currentLanguage = 'th'; 
let currentScore = 0; 
let gameMode = 'level'; // 'level' or 'custom'
let activeWorker = null; // เก็บ worker ล่าสุดเพื่อปิดเมื่อไม่ใช้


// === 4. Element จาก HTML ===
const menuScreen = document.getElementById('menu-screen');
const levelScreen = document.getElementById('level-screen');
const gamePlayScreen = document.getElementById('game-play-screen');
const setupScreen = document.getElementById('setup-screen'); // เพิ่ม setupScreen
const soloModeButton = document.getElementById('solo-mode-button');
const customModeButton = document.getElementById('custom-mode-button');
const backToMenuButton = document.getElementById('back-to-menu-button');
const startLevelButton = document.getElementById('start-level-button');
const nextLevelButton = document.getElementById('next-level-button');
const backToLevelsButton = document.getElementById('back-to-levels-button');
const startCustomGameButton = document.getElementById('start-custom-game-button');
const backFromSetupButton = document.getElementById('back-from-setup-button');
const levelDisplay = document.getElementById('level-display');
const currentScoreEl = document.getElementById('current-score');
const timerDisplay = document.getElementById('timer-display');
const targetNumberEl = document.getElementById('target-number');
const inputNumbersContainer = document.getElementById('input-numbers-container'); 
const equationInput = document.getElementById('equation-input');
const submitButton = document.getElementById('submit-button');
const shuffleButton = document.getElementById('shuffle-button');
const resultTextEl = document.getElementById('result-text');
const mathSymbolButtons = document.querySelectorAll('.math-symbol-button');
const currentLevelTitle = document.getElementById('current-level-title');
const levelDescription = document.getElementById('level-description');
const levelTargetRange = document.getElementById('level-target-range');
const levelNumberCount = document.getElementById('level-number-count');
const levelTimeLimit = document.getElementById('level-time-limit');
const shuffleLimitText = document.getElementById('shuffle-limit-text'); 
const langButtons = document.querySelectorAll('.lang-button'); 
const setupTargetType = document.getElementById('setup-target-type');
const setupNumberCount = document.getElementById('setup-number-count');
const setupTime = document.getElementById('setup-time');


// === 5. ฟังก์ชันจัดการการแสดงผลหน้าจอ (Screen Management) ===
function showScreen(screen) {
    // รวมทุก Screen ไว้ใน Array แล้ววนลูปปิดให้หมด
    [menuScreen, levelScreen, gamePlayScreen, setupScreen].forEach(el => {
        if (el) {
            el.classList.remove('active');
        }
    });
    // เปิดเฉพาะอันที่เลือก
    if (screen) {
        screen.classList.add('active');
    }
}


// === 6. ฟังก์ชันจัดการภาษา (i18n) ===
function setLanguage(lang) {
    currentLanguage = lang;
    const t = TRANSLATIONS[lang];
    const titleH1 = document.getElementById('title-h1');
    if (titleH1) titleH1.textContent = t.title;
    const subtitleP = document.getElementById('subtitle-p');
    if (subtitleP) subtitleP.textContent = t.subtitle;
    equationInput.placeholder = t.placeholder;
    currentScoreEl.textContent = currentScore; 

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        el.textContent = t[key];
    });

    document.querySelectorAll('[data-i18n-prefix]').forEach(el => {
        const key = el.getAttribute('data-i18n-prefix');
        const prefix = t[key];
        const value = el.textContent.includes(':') ? el.textContent.split(': ')[1] : el.textContent;
        // Fix for when textContent is empty or just initialized
        const safeValue = value || (el.id === 'level-display' ? '1' : '0'); 
        el.textContent = `${prefix} ${safeValue.trim()}`;
    });
    
    mathSymbolButtons.forEach(button => {
        const symbol = button.getAttribute('data-symbol');
        if (symbol === 'fact') button.textContent = t.factorial;
        else if (symbol === 'Math.sqrt(') button.textContent = t.sqrt;
        else if (symbol === '**') button.textContent = t.power;
        else button.textContent = symbol;
    });

    langButtons.forEach(btn => btn.classList.remove('active'));
    const activeLangButton = document.getElementById(`lang-${lang}`);
    if (activeLangButton) activeLangButton.classList.add('active');

    // Update dynamic text based on current screen
    if (gamePlayScreen.classList.contains('active')) {
        updateShuffleDisplay();
        targetNumberEl.textContent = `${t.target_prefix} ${targetNumber}`;
        if(gameMode === 'custom') {
             levelDisplay.textContent = (lang === 'th') ? "โหมด: กำหนดเอง" : "Mode: Custom";
        } else {
             levelDisplay.textContent = `${t.level_prefix} ${currentLevel}`;
        }
    }
}


// === 7. Utilities ===
function fact(n) {
    if (n < 0 || !Number.isInteger(n)) return NaN; 
    if (n === 0 || n === 1) return 1;
    if (n > 7) return NaN;
    let result = 1;
    for (let i = 2; i <= n; i++) { result *= i; }
    return result;
}

function compareResult(a, b) {
    return Math.abs(a - b) < 0.001;
}

function insertAtCaret(inputElement, text) {
    const start = inputElement.selectionStart;
    const end = inputElement.selectionEnd;
    const value = inputElement.value;
    inputElement.value = value.substring(0, start) + text + value.substring(end);
    const newCaretPosition = start + text.length;
    inputElement.selectionStart = newCaretPosition;
    inputElement.selectionEnd = newCaretPosition;
    inputElement.focus();
}


// === 8. ฟังก์ชันจัดการตัวจับเวลา ===
function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerDisplay.textContent = `⏳ ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer(duration) {
    clearInterval(timerInterval); 
    timeRemaining = duration;
    updateTimerDisplay();

    timerInterval = setInterval(() => {
        timeRemaining--;
        updateTimerDisplay();

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            handleTimeUp();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function handleTimeUp() {
    const t = TRANSLATIONS[currentLanguage];
    resultTextEl.textContent = t.time_up;
    resultTextEl.className = 'error';
    submitButton.disabled = true;
    shuffleButton.disabled = true;
    nextLevelButton.style.display = 'none';
    backToLevelsButton.style.display = 'block';
}


// === 9. ฟังก์ชันจัดการการแสดงผลสิทธิ์สุ่มและปุ่มตัวเลข ===
function updateShuffleDisplay() {
    const t = TRANSLATIONS[currentLanguage];
    if (shufflesRemaining > 0) {
        shuffleLimitText.textContent = t.shuffle_limit(shufflesRemaining);
        shuffleButton.disabled = false;
    } else {
        shuffleLimitText.textContent = t.shuffle_exhausted;
        shuffleButton.disabled = true;
    }
}

function createNumberButtons() {
    inputNumbersContainer.innerHTML = '';
    inputNumbers.forEach((number) => {
        const button = document.createElement('button');
        button.textContent = number;
        button.classList.add('number-button');
        button.addEventListener('click', () => {
            insertAtCaret(equationInput, String(number));
            button.disabled = true;
        });
        inputNumbersContainer.appendChild(button);
    });
}


// === 10. ฟังก์ชันสุ่มเกมและเริ่มต้นเกมใหม่ (Core Logic) ===
// เพิ่ม parameter 'maintainTime' เพื่อบอกว่าต้องใช้เวลาเดิมต่อหรือไม่
function generateNewGame(levelConfig, maintainTime = false) {
    const t = TRANSLATIONS[currentLanguage];

    // Terminate old worker if exists to prevent overlapping logic
    if (activeWorker) {
        activeWorker.terminate();
    }

    targetNumberEl.textContent = `...`;
    targetNumberEl.classList.remove('target-number');
    targetNumberEl.classList.add('loading-text');
    inputNumbersContainer.innerHTML = 'Finding Solvable Puzzle...';
    resultTextEl.textContent = 'Loading...';
    submitButton.disabled = true;
    shuffleButton.disabled = true;

    // สร้าง Worker ใหม่
    activeWorker = new Worker('solver_worker.js');
    activeWorker.postMessage({ levelConfig: levelConfig });

    activeWorker.onmessage = function(e) {
        const { solvable, targetNumber: newTarget, inputNumbers: newNumbers, attempts, timeTaken, solutions} = e.data;
        
        // แสดงสถิติเบื้องหลังใน Console เพื่อการตรวจสอบ
        console.log(`[Worker] Checked ${attempts} patterns in ${timeTaken}ms`);
        console.log(`[Worker] Found ${solutions.length} solutions. Examples:`, solutions);

        targetNumber = newTarget;
        inputNumbers = newNumbers;
        
        targetNumberEl.textContent = `${t.target_prefix} ${targetNumber}`;
        targetNumberEl.classList.add('target-number');
        targetNumberEl.classList.remove('loading-text');
        createNumberButtons(); 

        if (!solvable) {
             resultTextEl.textContent = `Warning: Check failed after ${attempts} attempts.`;
        } else {
             resultTextEl.textContent = ''; 
        }
        
        equationInput.value = '';
        submitButton.disabled = false;
        shuffleButton.disabled = false;
        nextLevelButton.style.display = 'none';
        backToLevelsButton.style.display = 'none';
        equationInput.focus();
        
        updateShuffleDisplay();
        
        // Timer Logic: ถ้าเป็นการสุ่มใหม่ (maintainTime=true) ให้ใช้เวลาที่เหลืออยู่
        stopTimer(); 
        if (maintainTime) {
            startTimer(timeRemaining);
        } else {
            startTimer(levelConfig.timeLimitSeconds);
        }
        
        // Terminate worker after done
        activeWorker.terminate();
        activeWorker = null;
    };
    
    activeWorker.onerror = function(err) {
        console.error('Worker Error:', err);
        alert('Critical Error with Worker. Please refresh.');
        showScreen(menuScreen); 
    };
}

function startGameForLevel(level) {
    const t = TRANSLATIONS[currentLanguage];
    const levelConfig = LEVELS.find(l => l.id === level);
    if (!levelConfig) return;

    currentLevel = level;
    gameMode = 'level'; // Set mode
    levelDisplay.textContent = `${t.level_prefix} ${currentLevel}`;
    showScreen(gamePlayScreen);
    
    shufflesRemaining = 2; 
    generateNewGame(levelConfig, false); // false = เริ่มเวลาใหม่
}


// === 11. ฟังก์ชันตรวจสอบคำตอบ ===
function validateEquation(equation) {
    const t = TRANSLATIONS[currentLanguage];
    let calculatedValue;
    
    try {
        const finalEquation = equation.replace(/fact\s*\((.*?)\)/g, 'fact($1)');
        calculatedValue = new Function('fact', `return ${finalEquation}`)(fact); 
    } catch (e) {
        return t.error_format;
    }

    if (!isFinite(calculatedValue) || isNaN(calculatedValue)) {
        return t.error_result_nan;
    }
    
    if (!compareResult(calculatedValue, targetNumber)) { 
        return t.error_result_mismatch(calculatedValue.toFixed(2), targetNumber);
    }
    
    // Check Number Usage
    let allowedCopy = [...inputNumbers];
    let usageValid = true;
    let sanitizedEquation = equation.replace(/(Math\.sqrt|fact)\s*\((.*?)\)/g, '()');
    const usedNumbersMatches = sanitizedEquation.match(/\d+/g) || [];
    const usedNumbers = usedNumbersMatches.map(Number);
    
    for (const num of usedNumbers) {
        const index = allowedCopy.indexOf(num);
        if (index > -1) {
            allowedCopy.splice(index, 1);
        } else {
            usageValid = false;
            break;
        }
    }

    if (!usageValid) return t.error_usage;

    return t.success;
}


// === 12. Submit Handle ===
function handleSubmit() {
    const t = TRANSLATIONS[currentLanguage];
    const equation = equationInput.value.trim();

    // --- ตรวจสอบการใช้เลขครบทุกตัวก่อน (เพิ่มใหม่) ---
    const allNumberButtons = Array.from(inputNumbersContainer.querySelectorAll('.number-button'));
    const unusedButtons = allNumberButtons.filter(btn => !btn.disabled);

    if (unusedButtons.length > 0) {
        const msg = currentLanguage === 'th' ? 
            `ต้องใช้ตัวเลขให้ครบทุกตัว! (เหลืออีก ${unusedButtons.length} ตัว)` : 
            `Use all numbers! (${unusedButtons.length} left)`;
        resultTextEl.textContent = msg;
        resultTextEl.className = 'error'; // ใช้สไตล์แจ้งเตือนที่คุณทำไว้แล้ว
        return; 
    }

    stopTimer(); 
    if (!equation) {
        resultTextEl.textContent = t.placeholder;
        resultTextEl.className = 'error';
        startTimer(timeRemaining);
        return;
    }

    const result = validateEquation(equation);

    if (result === t.success) { 
        resultTextEl.textContent = result;
        resultTextEl.className = 'success';
        submitButton.disabled = true;
        shuffleButton.disabled = true;
        
        // Calculate Score
        currentScore += (gameMode === 'level' ? currentLevel : 1) * 100 + timeRemaining;
        currentScoreEl.textContent = currentScore;
        
        // Win Logic
        if (gameMode === 'level' && typeof currentLevel === 'number' && currentLevel < LEVELS.length) {
            nextLevelButton.style.display = 'block';
            backToLevelsButton.style.display = 'none';
        } else {
            if (gameMode === 'level') {
                 resultTextEl.textContent += ` ${t.final_win}`;
            } else {
                 resultTextEl.textContent += ` (ยอดเยี่ยม! กด "สุ่มเลขใหม่" เพื่อเล่นต่อ)`;
            }
            nextLevelButton.style.display = 'none';
            backToLevelsButton.style.display = 'block';
        }
    } else {
        resultTextEl.textContent = `ERROR: ${result}`;
        resultTextEl.className = 'error';
        document.querySelectorAll('.number-button').forEach(btn => btn.disabled = false);
        startTimer(timeRemaining); // Resume timer
    }
}


// === 13. Level Screen Logic ===
function showLevelScreen() {
    showScreen(levelScreen);
    const t = TRANSLATIONS[currentLanguage];
    
    const config = LEVELS.find(l => l.id === currentLevel);
    if (!config) {
        currentLevel = 1;
        return showLevelScreen(); 
    }

    levelDescription.textContent = t[`level_${config.id}_desc`];
    currentLevelTitle.textContent = `${t.level_prefix} ${config.id}`;
    levelTargetRange.textContent = `${config.targetRange.min}-${config.targetRange.max}`;
    levelNumberCount.textContent = config.numberCount;
    
    const minutes = Math.floor(config.timeLimitSeconds / 60);
    const seconds = config.timeLimitSeconds % 60;
    levelTimeLimit.textContent = seconds > 0 ? 
        `${t.time_unit_min(minutes)} ${t.time_unit_sec(seconds)}` : 
        t.time_unit_min(minutes);
}


// === 14. Main Event Listeners ===
function addEventListeners() {
    // Navigation
    if(soloModeButton) soloModeButton.addEventListener('click', () => {
        gameMode = 'level';
        currentLevel = 1;
        currentScore = 0; 
        currentScoreEl.textContent = currentScore;
        showLevelScreen();
    });
    
    if(backToMenuButton) backToMenuButton.addEventListener('click', () => { showScreen(menuScreen); });
    if(startLevelButton) startLevelButton.addEventListener('click', () => { startGameForLevel(currentLevel); });
    
    if(nextLevelButton) nextLevelButton.addEventListener('click', () => {
        currentLevel++;
        startGameForLevel(currentLevel);
    });
    
    if(backToLevelsButton) backToLevelsButton.addEventListener('click', () => {
        stopTimer();
        showScreen(menuScreen);
    });
    
    // Custom Mode Navigation
    if(customModeButton) customModeButton.addEventListener('click', () => { showScreen(setupScreen); });
    if(backFromSetupButton) backFromSetupButton.addEventListener('click', () => { showScreen(menuScreen); });

    // Custom Game Start
    if(startCustomGameButton) startCustomGameButton.addEventListener('click', () => {
        gameMode = 'custom';
        const targetType = setupTargetType.value;
        const numCount = parseInt(setupNumberCount.value);
        const timeLimit = parseInt(setupTime.value);
        
        let minT, maxT;
        if (targetType === '24') { minT = 24; maxT = 24; }
        else if (targetType === '2digits') { minT = 10; maxT = 99; }
        else if (targetType === '3digits') { minT = 100; maxT = 999; }
        else { minT = 1000; maxT = 9999; }
        
        const customConfig = {
            id: 'custom',
            targetDigits: (targetType === '3digits') ? 3 : 2,
            numberCount: numCount,
            timeLimitSeconds: timeLimit,
            targetRange: { min: minT, max: maxT }
        };

        levelDisplay.textContent = (currentLanguage === 'th') ? "โหมด: กำหนดเอง" : "Mode: Custom";
        nextLevelButton.style.display = 'none';
        backToLevelsButton.style.display = 'block';

        showScreen(gamePlayScreen);
        shufflesRemaining = 99; 
        generateNewGame(customConfig, false);
    });

    // Game Actions
    submitButton.addEventListener('click', handleSubmit);
    
    shuffleButton.addEventListener('click', () => {
        if (shufflesRemaining > 0) {
            shufflesRemaining--;
            stopTimer(); 
            // สร้าง config ปัจจุบันขึ้นมาใหม่เพื่อส่งให้ Worker
            let currentConfig;
            if (gameMode === 'custom') {
                const targetType = setupTargetType.value;
                let minT, maxT;
                if (targetType === '24') { minT = 24; maxT = 24; }
                else if (targetType === '2digits') { minT = 10; maxT = 99; }
                else if (targetType === '3digits') { minT = 100; maxT = 999; }
                else { minT = 1000; maxT = 9999; }
                currentConfig = {
                    numberCount: parseInt(setupNumberCount.value),
                    timeLimitSeconds: parseInt(setupTime.value),
                    targetRange: { min: minT, max: maxT }
                };
            } else {
                currentConfig = LEVELS.find(l => l.id === currentLevel);
            }
            // ส่ง true ไปเพื่อบอกว่า "อย่ารีเซ็ตเวลานะ"
            generateNewGame(currentConfig, true); 
        } 
    });

    mathSymbolButtons.forEach(button => {
        button.addEventListener('click', () => {
            const symbol = button.getAttribute('data-symbol');
            let textToInsert = symbol;
            if (symbol === 'fact' || symbol === 'Math.sqrt(') textToInsert += '('; // Fix logic for sqrt
            insertAtCaret(equationInput, textToInsert); 
        });
    });
    
    equationInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !submitButton.disabled) {
            e.preventDefault();
            handleSubmit();
        }
    });

    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            setLanguage(button.getAttribute('data-lang'));
        });
    });
    // === Keyboard Mapping Logic
    window.addEventListener('keydown', (e) => {
        // 1. ตรวจสอบว่าหน้าจอเกมเปิดอยู่หรือไม่
        if (!gamePlayScreen.classList.contains('active')) return;

        const key = e.key;

        // 2. ดักจับตัวเลข 1-9
        if (/[1-9]/.test(key)) {
            const buttons = Array.from(inputNumbersContainer.querySelectorAll('.number-button'));
            const availableButton = buttons.find(btn => btn.textContent === key && !btn.disabled);
            
            if (availableButton) {
                e.preventDefault(); // สั่งหยุดการพิมพ์ปกติของเบราว์เซอร์ เพื่อไม่ให้เลขขึ้นซ้ำ
                availableButton.click(); 
            }
        } 
        // 3. ดักจับปุ่มพิเศษ เช่น Fact และ Root
        else if (key === '!') {
            e.preventDefault();
            insertAtCaret(equationInput, 'fact(');
        }
        else if (key === 'r' || key === 'R') {
            e.preventDefault();
            insertAtCaret(equationInput, 'Math.sqrt(');
        }
        else if (key === '^') {
            e.preventDefault();
            insertAtCaret(equationInput, '**');
        }
        // สำหรับเครื่องหมาย + - * / ( ) ปล่อยให้เบราว์เซอร์พิมพ์ตามปกติได้เลย ไม่ต้อง PreventDefault
    });
}

addEventListeners();
setLanguage(currentLanguage); 
showScreen(menuScreen);