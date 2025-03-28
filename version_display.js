// 版本號顯示系統

function createVersionDisplay() {
    const versionDisplay = document.createElement('div');
    versionDisplay.id = 'versionDisplay';
    versionDisplay.style.position = 'fixed';
    versionDisplay.style.bottom = '10px';
    versionDisplay.style.right = '20px';
    versionDisplay.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    versionDisplay.style.color = '#666';
    versionDisplay.style.padding = '5px 10px';
    versionDisplay.style.borderRadius = '5px';
    versionDisplay.style.fontSize = '12px';
    versionDisplay.style.zIndex = '1000';
    
    // 從gameData中獲取版本號
    const version = window.gameData ? window.gameData.version : 'indev-250328';
    versionDisplay.textContent = `${version}`;
    
    document.body.appendChild(versionDisplay);
}

// 更新版本號顯示
function updateVersionDisplay(version) {
    const versionDisplay = document.getElementById('versionDisplay');
    if (versionDisplay) {
        versionDisplay.textContent = `${version}`;
    }
}

// 初始化版本號顯示系統
function initVersionDisplay() {
    createVersionDisplay();
}