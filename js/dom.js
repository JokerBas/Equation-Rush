// js/dom.js
// DOM element references — query ครั้งเดียวตอน load ใช้ได้ทุกโมดูล

export const dom = {
    // Screens
    menuScreen:     document.getElementById('menu-screen'),
    levelScreen:    document.getElementById('level-screen'),
    gamePlayScreen: document.getElementById('game-play-screen'),
    setupScreen:    document.getElementById('setup-screen'),

    // Navigation buttons
    soloModeButton:       document.getElementById('solo-mode-button'),
    customModeButton:     document.getElementById('custom-mode-button'),
    backToMenuButton:     document.getElementById('back-to-menu-button'),
    startLevelButton:     document.getElementById('start-level-button'),
    nextLevelButton:      document.getElementById('next-level-button'),
    backToLevelsButton:   document.getElementById('back-to-levels-button'),
    startCustomGameButton:document.getElementById('start-custom-game-button'),
    backFromSetupButton:  document.getElementById('back-from-setup-button'),

    // Game header displays
    levelDisplay:   document.getElementById('level-display'),
    currentScoreEl: document.getElementById('current-score'),
    timerDisplay:   document.getElementById('timer-display'),
    targetNumberEl: document.getElementById('target-number'),

    // Gameplay area
    inputNumbersContainer: document.getElementById('input-numbers-container'),
    equationInput:         document.getElementById('equation-input'),
    submitButton:          document.getElementById('submit-button'),
    shuffleButton:         document.getElementById('shuffle-button'),
    resultTextEl:          document.getElementById('result-text'),
    shuffleLimitText:      document.getElementById('shuffle-limit-text'),

    // Level info screen
    currentLevelTitle: document.getElementById('current-level-title'),
    levelDescription:  document.getElementById('level-description'),
    levelTargetRange:  document.getElementById('level-target-range'),
    levelNumberCount:  document.getElementById('level-number-count'),
    levelTimeLimit:    document.getElementById('level-time-limit'),

    // Setup screen
    setupTargetType:  document.getElementById('setup-target-type'),
    setupNumberCount: document.getElementById('setup-number-count'),
    setupTime:        document.getElementById('setup-time'),

    // NodeLists (query ครั้งเดียว)
    mathSymbolButtons: document.querySelectorAll('.math-symbol-button'),
    langButtons:       document.querySelectorAll('.lang-button'),
};
