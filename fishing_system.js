// 釣魚系統模組 - 管理釣魚相關功能

// 釣魚系統
window.FishingSystem = {
    // 釣魚狀態
    status: {
        isFishing: false,
        fishCaught: null,
        progressInterval: null,
        progressValue: 0,
        progressDecay: 0.3, // 基礎衰減速率
        clickPower: 8, // 點擊力量
        fishingStage: 0, // 0: 未釣魚, 1: 釣竿階段, 2: 進度條階段
        rodTouchCount: 0, // 記錄玩家觸碰釣竿按鈕的次數
        rodTouchTarget: 0, // 需要觸碰的目標次數
        currentRodLuck: 0, // 當前釣竿的運氣加成
        currentRodPower: 0, // 當前釣竿的力量加成
        fishingTimeoutId: null // 釣魚超時計時器ID
    },
    
    // 初始化釣魚系統
    init: function() {
        // 重置釣魚狀態
        this.resetStatus();
        
        // 獲取當前釣竿的力量
        if (window.FishingRod) {
            this.status.currentRodPower = window.FishingRod.getCurrentRodPower();
        }
        
        // 綁定釣魚按鈕事件
        const fishButton = document.querySelector('.fish-button');
        if (fishButton) {
            fishButton.onclick = this.startFishing.bind(this);
        }
    },
    
    // 重置釣魚狀態
    resetStatus: function() {
        // 清除所有計時器
        if (this.status.progressInterval) {
            clearInterval(this.status.progressInterval);
            this.status.progressInterval = null;
        }
        
        if (this.status.fishingTimeoutId) {
            clearTimeout(this.status.fishingTimeoutId);
            this.status.fishingTimeoutId = null;
        }
        
        // 重置狀態
        this.status.isFishing = false;
        this.status.fishCaught = null;
        this.status.progressValue = 0;
        this.status.fishingStage = 0;
        this.status.rodTouchCount = 0;
        this.status.rodTouchTarget = 0;
        
        // 隱藏釣魚相關元素
        const rodButton = document.getElementById('rodButton');
        const progressContainer = document.getElementById('progressContainer');
        const fishAnimation = document.getElementById('fishAnimation');
        
        if (rodButton) rodButton.style.display = 'none';
        if (progressContainer) progressContainer.style.display = 'none';
        if (fishAnimation) fishAnimation.style.display = 'none';
        
        // 重置釣魚按鈕
        const fishButton = document.querySelector('.fish-button');
        if (fishButton) {
            fishButton.disabled = false;
            fishButton.textContent = '開始釣魚';
        }
    },
    
    // 開始釣魚
    startFishing: function() {
        // 如果已經在釣魚中，直接返回
        if (this.status.isFishing) return;
        
        // 獲取所有需要的DOM元素
        const fishButton = document.querySelector('.fish-button');
        const fishingSpot = document.getElementById('fishingSpot');
        const progressContainer = document.getElementById('progressContainer');
        const progressBar = document.getElementById('progressBar');
        const fishAnimation = document.getElementById('fishAnimation');
        const rodButton = document.getElementById('rodButton');
        
        console.log('開始釣魚函數被調用');
        
        // 重置釣魚狀態
        this.resetStatus();
        
        // 設置釣魚狀態
        fishButton.disabled = true;
        fishButton.textContent = '釣魚中...';
        this.status.isFishing = true;
        this.status.fishingStage = 1; // 進入釣竿階段
        
        // 設置目標點擊次數（5-10之間的隨機數）
        this.status.rodTouchTarget = Math.floor(Math.random() * 6) + 5;
        console.log(`釣竿階段：需要點擊 ${this.status.rodTouchTarget} 次`);
        
        // 第一階段：顯示釣竿按鈕
        rodButton.style.display = 'block';
        rodButton.style.left = Math.random() * (fishingSpot.offsetWidth - 60) + 'px';
        rodButton.style.top = Math.random() * (fishingSpot.offsetHeight - 60) + 'px';
        
        // 確保移除之前的事件監聽器
        rodButton.onclick = null;
        fishingSpot.onclick = null;
        
        // 設置釣竿按鈕點擊事件
        rodButton.onclick = this.handleRodButtonClick.bind(this);
        
        // 設置釣魚超時
        this.status.fishingTimeoutId = setTimeout(() => {
            this.fishingFailed('釣魚超時，魚跑掉了！');
        }, 30000); // 30秒超時
    },
    
    // 處理釣竿按鈕點擊
    handleRodButtonClick: function(event) {
        if (event) {
            event.stopPropagation(); // 防止事件冒泡
        }
        
        // 確保我們仍然在釣竿階段
        if (this.status.fishingStage !== 1 || !this.status.isFishing) {
            console.log('釣竿點擊被忽略，當前階段不是釣竿階段或釣魚已停止');
            return;
        }
        
        const fishingSpot = document.getElementById('fishingSpot');
        const rodButton = document.getElementById('rodButton');
        
        // 增加觸碰計數
        this.status.rodTouchCount++;
        console.log(`釣竿按鈕點擊: ${this.status.rodTouchCount}/${this.status.rodTouchTarget}`);
        
        // 如果還沒達到目標次數，則移動釣竿按鈕到新位置
        if (this.status.rodTouchCount < this.status.rodTouchTarget) {
            rodButton.style.left = Math.random() * (fishingSpot.offsetWidth - 60) + 'px';
            rodButton.style.top = Math.random() * (fishingSpot.offsetHeight - 60) + 'px';
            return;
        }
        
        // 達到目標次數後，隱藏釣竿按鈕並進入進度條階段
        console.log('達到目標點擊次數，進入進度條階段');
        rodButton.style.display = 'none';
        this.status.fishingStage = 2; // 進入進度條階段
        
        // 清除釣竿階段的超時計時器
        if (this.status.fishingTimeoutId) {
            clearTimeout(this.status.fishingTimeoutId);
            this.status.fishingTimeoutId = null;
        }
        
        // 檢查是否有魚上鉤
        this.status.fishCaught = this.checkForFish();
        console.log('魚上鉤檢查結果:', this.status.fishCaught);
        
        if (this.status.fishCaught) {
            this.startProgressBarStage();
        } else {
            this.fishingFailed('釣魚失敗，沒有魚上鉤！');
        }
    },
    
    // 開始進度條階段
    startProgressBarStage: function() {
        const fishingSpot = document.getElementById('fishingSpot');
        const progressContainer = document.getElementById('progressContainer');
        const progressBar = document.getElementById('progressBar');
        const fishAnimation = document.getElementById('fishAnimation');
        
        try {
            // 顯示魚的動畫
            fishAnimation.style.display = 'block';
            fishAnimation.style.left = Math.random() * (fishingSpot.offsetWidth - 50) + 'px';
            fishAnimation.style.top = Math.random() * (fishingSpot.offsetHeight - 30) + 'px';
            console.log('魚的動畫已顯示');
            
            // 顯示進度條
            progressContainer.style.display = 'block';
            this.status.progressValue = 30; // 起始進度
            progressBar.style.width = this.status.progressValue + '%';
            progressBar.style.display = 'block';
            console.log('進度條已顯示，初始進度值:', this.status.progressValue);
            
            // 設置點擊事件
            fishingSpot.onclick = this.handleFishingSpotClick.bind(this);
            
            // 設置進度條衰減
            this.status.progressInterval = setInterval(() => {
                // 根據魚的稀有度和釣竿的力量調整衰減速率
                const decayRate = this.status.progressDecay * this.status.fishCaught.decayRate / (1 + this.status.currentRodPower * 0.05);
                this.status.progressValue -= decayRate;
                
                if (this.status.progressValue <= 0) {
                    this.status.progressValue = 0;
                    this.fishingFailed('釣魚失敗，魚逃走了！');
                    return;
                }
                
                progressBar.style.width = this.status.progressValue + '%';
            }, 100);
            
            // 設置釣魚超時
            this.status.fishingTimeoutId = setTimeout(() => {
                this.fishingFailed('釣魚超時，魚跑掉了！');
            }, 20000); // 20秒超時
            
        } catch (error) {
            console.error('進度條階段初始化錯誤:', error);
            this.fishingFailed('釣魚過程中出現錯誤！');
        }
    },
    
    // 處理釣魚區域點擊
    handleFishingSpotClick: function() {
        console.log('釣魚區域被點擊，當前階段:', this.status.fishingStage);
        
        if (!this.status.isFishing || !this.status.fishCaught || this.status.fishingStage !== 2) {
            return;
        }
        
        const progressBar = document.getElementById('progressBar');
        
        // 增加進度值
        this.status.progressValue += this.status.clickPower * (1 + this.status.currentRodPower * 0.1);
        console.log('進度增加，當前進度:', this.status.progressValue);
        
        if (this.status.progressValue > 100) {
            this.status.progressValue = 100;
        }
        
        progressBar.style.width = this.status.progressValue + '%';
        
        if (this.status.progressValue >= 100) {
            // 釣魚成功
            this.fishingSuccess();
        }
    },
    
    // 釣魚成功
    fishingSuccess: function() {
        console.log('釣魚成功！進度達到100%');
        
        // 清除計時器
        if (this.status.progressInterval) {
            clearInterval(this.status.progressInterval);
            this.status.progressInterval = null;
        }
        
        if (this.status.fishingTimeoutId) {
            clearTimeout(this.status.fishingTimeoutId);
            this.status.fishingTimeoutId = null;
        }
        
        // 獲取釣到的魚
        const caughtFish = this.status.fishCaught;
        
        // 計算魚的重量（在重量範圍內的隨機值）
        const weight = caughtFish.weightRange[0] + Math.random() * (caughtFish.weightRange[1] - caughtFish.weightRange[0]);
        const roundedWeight = Math.round(weight * 10) / 10; // 四捨五入到一位小數
        
        // 計算魚的價格（基於基礎價格和重量）
        const price = Math.round(caughtFish.basePrice * (1 + (roundedWeight - caughtFish.weightRange[0]) / (caughtFish.weightRange[1] - caughtFish.weightRange[0]) * 0.5));
        
        // 創建魚的物品
        const fishItem = {
            name: caughtFish.name,
            rarity: caughtFish.rarity,
            weight: roundedWeight,
            price: price,
            color: caughtFish.color
        };
        
        // 添加到背包
        window.gameData.inventory.push(fishItem);
        
        // 增加經驗值（基於魚的稀有度和重量）
        let expGain = 0;
        switch (caughtFish.rarity) {
            case '常見的': expGain = 5; break;
            case '不常見的': expGain = 10; break;
            case '稀有': expGain = 20; break;
            case '傳奇': expGain = 50; break;
            case '神話': expGain = 100; break;
            case '神聖': expGain = 200; break;
            case '*極限': expGain = 500; break;
            default: expGain = 5;
        }
        
        // 根據魚的重量調整經驗值
        const weightFactor = roundedWeight / caughtFish.weightRange[1];
        expGain = Math.round(expGain * (1 + weightFactor));
        
        // 增加經驗值
        window.gameData.exp += expGain;
        
        // 檢查是否升級
        this.checkLevelUp();
        
        // 更新UI
        this.updateGameUI();
        
        // 顯示成功消息
        if (typeof gameAlert === 'function') {
            gameAlert(
                `釣到了 ${caughtFish.rarity} ${caughtFish.name}！<br>重量: ${roundedWeight} kg<br>價值: ${price} 金幣<br>獲得 ${expGain} 經驗值`,
                'success',
                '釣魚成功',
                3000
            );
        }
        
        // 重置釣魚狀態
        this.resetStatus();
        
        // 自動保存遊戲
        if (typeof autoSaveGame === 'function') {
            autoSaveGame();
        }
    },
    
    // 釣魚失敗
    fishingFailed: function(message) {
        console.log('釣魚失敗:', message);
        
        // 清除計時器
        if (this.status.progressInterval) {
            clearInterval(this.status.progressInterval);
            this.status.progressInterval = null;
        }
        
        if (this.status.fishingTimeoutId) {
            clearTimeout(this.status.fishingTimeoutId);
            this.status.fishingTimeoutId = null;
        }
        
        // 顯示失敗消息
        if (typeof gameAlert === 'function') {
            gameAlert(message, 'error', '釣魚失敗', 2000);
        }
        
        // 重置釣魚狀態
        this.resetStatus();
    },
    
    // 檢查是否有魚上鉤
    checkForFish: function() {
        // 獲取當前地點的魚類列表
        const locationFishes = window.GameData.getCurrentLocationFishes();
        if (!locationFishes || locationFishes.length === 0) {
            return null;
        }
        
        // 計算總機率
        let totalChance = 0;
        locationFishes.forEach(fish => {
            totalChance += fish.chance;
        });
        
        // 如果總機率為0，返回null
        if (totalChance === 0) {
            return null;
        }
        
        // 隨機選擇一條魚
        const random = Math.random() * totalChance;
        let accumulatedChance = 0;
        
        for (const fish of locationFishes) {
            accumulatedChance += fish.chance;
            if (random <= accumulatedChance) {
                return fish;
            }
        }
        
        // 如果沒有魚上鉤，返回null
        return null;
    },
    
    // 檢查是否升級
    checkLevelUp: function() {
        while (window.gameData.exp >= window.gameData.expThreshold) {
            // 升級
            window.gameData.level++;
            window.gameData.exp -= window.gameData.expThreshold;
            
            // 增加下一級所需經驗值
            window.gameData.expThreshold = Math.round(window.gameData.expThreshold * 1.5);
            
            // 顯示升級消息
            if (typeof gameAlert === 'function') {
                gameAlert(
                    `恭喜！你升到了 ${window.gameData.level} 級！<br>下一級需要 ${window.gameData.expThreshold} 經驗值`,
                    'success',
                    '升級',
                    5000
                );
            }
        }
    },
    
    // 更新遊戲UI
    updateGameUI: function() {
        // 更新等級和經驗值顯示
        document.getElementById('playerLevel').textContent = window.gameData.level;
        document.getElementById('playerExp').textContent = window.gameData.exp;
        document.getElementById('expThreshold').textContent = window.gameData.expThreshold;
        
        // 更新背包
        if (typeof updateInventory === 'function') {
            updateInventory();
        }
    }
};