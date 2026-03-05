// js/scratchpad.js
// กระดานทดเลข — panel ที่ slide ออกมาจากขอบขวาของหน้าจอ

import { dom } from './dom.js';

export function initScratchpad() {
    dom.scratchpadToggle.addEventListener('click', () => {
        const isOpen = dom.scratchpadPanel.classList.toggle('open');
        if (isOpen) dom.scratchpadTextarea.focus();
    });

    dom.scratchpadClose.addEventListener('click', closeScratchpad);

    dom.scratchpadClear.addEventListener('click', () => {
        dom.scratchpadTextarea.value = '';
        dom.scratchpadTextarea.focus();
    });
}

export function closeScratchpad() {
    if (dom.scratchpadPanel) dom.scratchpadPanel.classList.remove('open');
}
