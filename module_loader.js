// 模組加載系統 - 確保所有必要的模組都已正確載入

// 定義需要加載的模組列表
const requiredModules = [
    { name: 'game_data', variable: 'GameData', path: 'game_data.js' },
    { name: 'save_system', variable: 'initSaveSystem', path: 'save_system.js' },
    { name: 'notification', variable: 'showNotification', path: 'notification.js' },
    { name: 'changelog', variable: 'initChangelogSystem', path: 'changelog.js' },
    { name: 'version_display', variable: 'initVersionDisplay', path: 'version_display.js' }
];

// 模組加載狀態
const moduleStatus = {
    loaded: [],
    failed: []
};

// 檢查模組是否已加載
function isModuleLoaded(moduleName, variableName) {
    // 檢查全局變量是否存在
    return window[variableName] !== undefined;
}

// 加載單個模組
function loadModule(module) {
    return new Promise((resolve, reject) => {
        // 如果模組已經加載，直接返回成功
        if (isModuleLoaded(module.name, module.variable)) {
            moduleStatus.loaded.push(module.name);
            resolve(module.name);
            return;
        }

        // 創建腳本元素
        const script = document.createElement('script');
        script.src = module.path;
        script.async = true;

        // 設置加載成功事件
        script.onload = () => {
            // 再次檢查模組是否成功加載
            if (isModuleLoaded(module.name, module.variable)) {
                moduleStatus.loaded.push(module.name);
                resolve(module.name);
            } else {
                moduleStatus.failed.push(module.name);
                reject(new Error(`模組 ${module.name} 已加載但變量 ${module.variable} 未定義`));
            }
        };

        // 設置加載失敗事件
        script.onerror = () => {
            moduleStatus.failed.push(module.name);
            reject(new Error(`無法加載模組 ${module.name} (${module.path})`));
        };

        // 將腳本添加到文檔中
        document.head.appendChild(script);
    });
}

// 加載所有模組
function loadAllModules() {
    const loadPromises = requiredModules.map(module => {
        return loadModule(module).catch(error => {
            console.error(error.message);
            return Promise.reject(error);
        });
    });

    return Promise.allSettled(loadPromises);
}

// 顯示模組加載狀態
function displayModuleStatus() {
    console.log('模組加載狀態:');
    console.log('已加載:', moduleStatus.loaded.join(', ') || '無');
    console.log('加載失敗:', moduleStatus.failed.join(', ') || '無');

    // 如果有模組加載失敗，顯示錯誤通知
    if (moduleStatus.failed.length > 0) {
        // 檢查通知系統是否可用
        if (typeof showNotification === 'function') {
            showNotification(
                `以下模組加載失敗: ${moduleStatus.failed.join(', ')}。遊戲可能無法正常運行。`,
                'error',
                '模組加載錯誤',
                10000
            );
        } else {
            alert(`模組加載錯誤: 以下模組加載失敗: ${moduleStatus.failed.join(', ')}。遊戲可能無法正常運行。`);
        }
        return false;
    }
    return true;
}

// 初始化模組加載系統
function initModuleLoader() {
    return loadAllModules()
        .then(() => {
            const success = displayModuleStatus();
            if (success && typeof GameData === 'object') {
                // 初始化遊戲數據
                GameData.initGameData();
            }
            return success;
        })
        .catch(error => {
            console.error('模組加載系統初始化失敗:', error);
            return false;
        });
}

// 導出模組加載系統
window.ModuleLoader = {
    init: initModuleLoader,
    getStatus: () => ({ ...moduleStatus }),
    isModuleLoaded: (moduleName) => moduleStatus.loaded.includes(moduleName)
};