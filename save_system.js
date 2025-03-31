// 存檔系統 - 使用localStorage實現本地存檔功能

// 保存遊戲數據到localStorage
function saveGame() {
    try {
        // 獲取當前時間作為存檔時間
        const saveTime = new Date().toLocaleString();
        
        // 創建存檔對象，包含遊戲數據和存檔時間
        const saveData = {
            gameData: window.gameData,
            saveTime: saveTime,
            version: window.gameData.version
        };
        
        // 將存檔對象轉換為JSON字符串
        const saveString = JSON.stringify(saveData);
        
        // 保存到localStorage
        localStorage.setItem('fishingGameSave', saveString);
        
        // 更新存檔時間顯示
        updateSaveTimeDisplay(saveTime);
        
        // 顯示保存成功通知
        if (typeof gameAlert === 'function') {
            gameAlert('遊戲已保存！', 'success', '存檔成功', 2000);
        } else {
            console.log('遊戲已保存！');
        }
        
        return true;
    } catch (error) {
        console.error('保存遊戲失敗:', error);
        
        // 顯示保存失敗通知
        if (typeof gameAlert === 'function') {
            gameAlert('保存遊戲失敗: ' + error.message, 'error', '存檔失敗', 3000);
        }
        
        return false;
    }
}

// 從localStorage加載遊戲數據
function loadGame() {
    try {
        // 從localStorage獲取存檔數據
        const saveString = localStorage.getItem('fishingGameSave');
        
        // 如果沒有存檔，返回false
        if (!saveString) {
            if (typeof gameAlert === 'function') {
                gameAlert('沒有找到存檔！', 'info', '讀檔提示', 2000);
            }
            return false;
        }
        
        // 解析JSON字符串為對象
        const saveData = JSON.parse(saveString);
        
        // 檢查版本兼容性
        if (saveData.version !== window.gameData.version) {
            if (typeof gameAlert === 'function') {
                gameAlert(`存檔版本(${saveData.version})與當前遊戲版本(${window.gameData.version})不同，可能會出現相容性問題！`, 'warning', '版本警告', 5000);
            }
        }
        
        // 保存當前版本號
        const currentVersion = window.gameData.version;
        
        // 將存檔數據應用到當前遊戲
        window.gameData = saveData.gameData;
        
        // 確保使用最新的版本號
        window.gameData.version = currentVersion;
        
        // 確保關鍵屬性存在且為數字
        if (typeof window.gameData.level !== 'number') {
            window.gameData.level = 1; // 設置默認值
        }
        if (typeof window.gameData.exp !== 'number') {
            window.gameData.exp = 0; // 設置默認值
        }
        if (typeof window.gameData.expThreshold !== 'number') {
            window.gameData.expThreshold = 100; // 設置默認值
        }
        
        // 更新遊戲界面
        updateGameUI();
        
        // 更新存檔時間顯示
        updateSaveTimeDisplay(saveData.saveTime);
        
        // 顯示加載成功通知
        if (typeof gameAlert === 'function') {
            gameAlert('遊戲已加載！', 'success', '讀檔成功', 2000);
        } else {
            console.log('遊戲已加載！');
        }
        
        return true;
    } catch (error) {
        console.error('加載遊戲失敗:', error);
        
        // 顯示加載失敗通知
        if (typeof gameAlert === 'function') {
            gameAlert('加載遊戲失敗: ' + error.message, 'error', '讀檔失敗', 3000);
        }
        
        return false;
    }
}

// 檢查是否有存檔
function hasSaveGame() {
    return localStorage.getItem('fishingGameSave') !== null;
}

// 更新遊戲界面
function updateGameUI() {
    // 更新金錢顯示
    document.getElementById('money').textContent = window.gameData.money;
    
    // 更新當前釣竿顯示
    document.getElementById('currentRod').textContent = window.gameData.currentRod.name;
    
    // 確保level和exp屬性存在且為數字
    if (typeof window.gameData.level !== 'number') {
        window.gameData.level = 1; // 設置默認值
    }
    if (typeof window.gameData.exp !== 'number') {
        window.gameData.exp = 0; // 設置默認值
    }
    if (typeof window.gameData.expThreshold !== 'number') {
        window.gameData.expThreshold = 100; // 設置默認值
    }
    
    // 更新等級顯示
    document.getElementById('playerLevel').textContent = window.gameData.level;
    document.getElementById('playerExp').textContent = Math.floor(window.gameData.exp);
    document.getElementById('expThreshold').textContent = Math.floor(window.gameData.expThreshold);
    
    // 如果達到最大等級，顯示(最大)標籤
    if (window.gameData.level >= 500) {
        document.getElementById('maxLevelTag').textContent = ' (最大)';
    } else {
        document.getElementById('maxLevelTag').textContent = '';
    }
    
    // 更新背包
    if (typeof window.updateInventory === 'function') {
        window.updateInventory();
    }
    
    // 更新版本號顯示
    if (typeof window.updateVersionDisplay === 'function') {
        window.updateVersionDisplay(window.gameData.version);
    }
    
    // 更新位置顯示
    updateLocationDisplay();
}

// 更新位置顯示
function updateLocationDisplay() {
    const location = window.gameData.currentLocation;
    
    // 移除舊的位置顯示（如果有）
    const oldLocationDisplay = document.getElementById('locationDisplay');
    if (oldLocationDisplay) {
        oldLocationDisplay.remove();
    }
    
    // 創建新的位置顯示
    const locationDisplay = document.createElement('div');
    locationDisplay.textContent = `當前位置: ${location}`;
    locationDisplay.style.position = 'absolute';
    locationDisplay.style.top = '10px';
    locationDisplay.style.left = '10px';
    locationDisplay.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    locationDisplay.style.padding = '5px 10px';
    locationDisplay.style.borderRadius = '5px';
    locationDisplay.style.zIndex = '10';
    locationDisplay.id = 'locationDisplay';
    
    document.getElementById('fishingSpot').appendChild(locationDisplay);
}

// 更新存檔時間顯示
function updateSaveTimeDisplay(saveTime) {
    // 移除舊的存檔時間顯示（如果有）
    const oldSaveTimeDisplay = document.getElementById('saveTimeDisplay');
    if (oldSaveTimeDisplay) {
        oldSaveTimeDisplay.remove();
    }
    
    // 如果沒有提供存檔時間，嘗試從localStorage獲取
    if (!saveTime) {
        try {
            const saveString = localStorage.getItem('fishingGameSave');
            if (saveString) {
                const saveData = JSON.parse(saveString);
                saveTime = saveData.saveTime;
            }
        } catch (error) {
            console.error('獲取存檔時間失敗:', error);
            return;
        }
    }
    
    // 如果仍然沒有存檔時間，不顯示
    if (!saveTime) return;
    
    // 創建存檔時間顯示
    const saveTimeDisplay = document.createElement('div');
    saveTimeDisplay.textContent = `上次存檔: ${saveTime}`;
    saveTimeDisplay.style.position = 'fixed';
    saveTimeDisplay.style.bottom = '10px';
    saveTimeDisplay.style.left = '120px';
    saveTimeDisplay.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    saveTimeDisplay.style.padding = '5px 10px';
    saveTimeDisplay.style.borderRadius = '5px';
    saveTimeDisplay.style.fontSize = '12px';
    saveTimeDisplay.style.color = '#666';
    saveTimeDisplay.style.zIndex = '1000';
    saveTimeDisplay.id = 'saveTimeDisplay';
    
    document.body.appendChild(saveTimeDisplay);
}

// 自動保存遊戲
function autoSaveGame() {
    try {
        const saveTime = new Date().toLocaleString();
        const saveData = {
            gameData: window.gameData,
            saveTime: saveTime,
            version: window.gameData.version
        };
        const saveString = JSON.stringify(saveData);
        localStorage.setItem('fishingGameSave', saveString);
        updateSaveTimeDisplay(saveTime);
    } catch (error) {
        console.error('自動保存失敗:', error);
    }
}

// 創建存檔按鈕
function createSaveButtons() {
    // 檢查是否已存在存檔按鈕
    if (document.getElementById('saveButton')) {
        return;
    }
    
    // 獲取側邊欄
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    
    // 創建存檔按鈕
    const saveButton = document.createElement('button');
    saveButton.id = 'saveButton';
    saveButton.className = 'shop-button';
    saveButton.textContent = '立刻存檔';
    saveButton.onclick = saveGame;
    saveButton.style.backgroundColor = '#2196F3';
    saveButton.style.background = 'linear-gradient(to bottom, #2196F3, #0d8bf2)';
    saveButton.style.zIndex = '50';
    saveButton.style.position = 'relative';
    saveButton.style.marginTop = '10px';
    
    // 創建聯絡作者按鈕
    const contactButton = document.createElement('button');
    contactButton.id = 'contactButton';
    contactButton.className = 'shop-button';
    contactButton.textContent = '聯絡作者';
    contactButton.onclick = () => window.open('https://docs.google.com/forms/d/e/1FAIpQLSerpLNIVX0gqPUvzNmrbGfZnBiHIKYcqDi3qPjCKelg0cu9-w/viewform?usp=dialog', '_blank');
    contactButton.style.backgroundColor = '#9C27B0';
    contactButton.style.background = 'linear-gradient(to bottom, #9C27B0, #7B1FA2)';
    contactButton.style.zIndex = '50';
    contactButton.style.position = 'relative';
    contactButton.style.marginTop = '10px';
    
    // 添加按鈕到側邊欄
    sidebar.appendChild(saveButton);
    sidebar.appendChild(contactButton);
}

// 初始化存檔系統
function initSaveSystem() {
    // 創建存檔按鈕
    createSaveButtons();
    
    // 自動讀取存檔
    if (hasSaveGame()) {
        loadGame();
    }
    
    // 設置20秒自動存檔
    setInterval(autoSaveGame, 20000);
}

// 檢查是否有存檔，如果有，顯示存檔時間
function hasSaveGame() {
    return localStorage.getItem('fishingGameSave') !== null;
}

// 更新遊戲界面
function updateGameUI() {
    // 更新金錢顯示
    document.getElementById('money').textContent = window.gameData.money;
    
    // 更新當前釣竿顯示
    document.getElementById('currentRod').textContent = window.gameData.currentRod.name;
    
    // 確保level和exp屬性存在且為數字
    if (typeof window.gameData.level !== 'number') {
        window.gameData.level = 1; // 設置默認值
    }
    if (typeof window.gameData.exp !== 'number') {
        window.gameData.exp = 0; // 設置默認值
    }
    if (typeof window.gameData.expThreshold !== 'number') {
        window.gameData.expThreshold = 100; // 設置默認值
    }
    
    // 更新等級顯示
    document.getElementById('playerLevel').textContent = window.gameData.level;
    document.getElementById('playerExp').textContent = Math.floor(window.gameData.exp);
    document.getElementById('expThreshold').textContent = Math.floor(window.gameData.expThreshold);
    
    // 如果達到最大等級，顯示(最大)標籤
    if (window.gameData.level >= 500) {
        document.getElementById('maxLevelTag').textContent = ' (最大)';
    } else {
        document.getElementById('maxLevelTag').textContent = '';
    }
    
    // 更新背包
    if (typeof window.updateInventory === 'function') {
        window.updateInventory();
    }
    
    // 更新版本號顯示
    if (typeof window.updateVersionDisplay === 'function') {
        window.updateVersionDisplay(window.gameData.version);
    }
    
    // 更新位置顯示
    updateLocationDisplay();
}

// 更新位置顯示
function updateLocationDisplay() {
    const location = window.gameData.currentLocation;
    
    // 移除舊的位置顯示（如果有）
    const oldLocationDisplay = document.getElementById('locationDisplay');
    if (oldLocationDisplay) {
        oldLocationDisplay.remove();
    }
    
    // 創建新的位置顯示
    const locationDisplay = document.createElement('div');
    locationDisplay.textContent = `當前位置: ${location}`;
    locationDisplay.style.position = 'absolute';
    locationDisplay.style.top = '10px';
    locationDisplay.style.left = '10px';
    locationDisplay.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    locationDisplay.style.padding = '5px 10px';
    locationDisplay.style.borderRadius = '5px';
    locationDisplay.style.zIndex = '10';
    locationDisplay.id = 'locationDisplay';
    
    document.getElementById('fishingSpot').appendChild(locationDisplay);
}

// 更新存檔時間顯示
function updateSaveTimeDisplay(saveTime) {
    // 移除舊的存檔時間顯示（如果有）
    const oldSaveTimeDisplay = document.getElementById('saveTimeDisplay');
    if (oldSaveTimeDisplay) {
        oldSaveTimeDisplay.remove();
    }
    
    // 如果沒有提供存檔時間，嘗試從localStorage獲取
    if (!saveTime) {
        try {
            const saveString = localStorage.getItem('fishingGameSave');
            if (saveString) {
                const saveData = JSON.parse(saveString);
                saveTime = saveData.saveTime;
            }
        } catch (error) {
            console.error('獲取存檔時間失敗:', error);
            return;
        }
    }
    
    // 如果仍然沒有存檔時間，不顯示
    if (!saveTime) return;
    
    // 創建存檔時間顯示
    const saveTimeDisplay = document.createElement('div');
    saveTimeDisplay.textContent = `上次存檔: ${saveTime}`;
    saveTimeDisplay.style.position = 'fixed';
    saveTimeDisplay.style.bottom = '10px';
    saveTimeDisplay.style.left = '120px';
    saveTimeDisplay.style.backgroundColor = 'rgba(255, 255, 255, 0.7)';
    saveTimeDisplay.style.padding = '5px 10px';
    saveTimeDisplay.style.borderRadius = '5px';
    saveTimeDisplay.style.fontSize = '12px';
    saveTimeDisplay.style.color = '#666';
    saveTimeDisplay.style.zIndex = '1000';
    saveTimeDisplay.id = 'saveTimeDisplay';
    
    document.body.appendChild(saveTimeDisplay);
}

// 導出函數
window.saveGame = saveGame;
window.loadGame = loadGame;
window.hasSaveGame = hasSaveGame;
window.initSaveSystem = initSaveSystem;
window.autoSaveGame = autoSaveGame;