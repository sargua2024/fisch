// 釣竿模組 - 管理釣竿相關功能

// 釣竿系統
window.FishingRod = {
    // 獲取所有釣竿列表
    getAllRods: function() {
        return window.GameData.rods;
    },
    
    // 獲取當前使用的釣竿
    getCurrentRod: function() {
        return window.gameData.currentRod;
    },
    
    // 設置當前使用的釣竿
    setCurrentRod: function(rodName) {
        const rod = window.GameData.getRodByName(rodName);
        if (rod) {
            window.gameData.currentRod = {
                name: rod.name,
                power: rod.power,
                price: rod.price
            };
            
            // 更新UI顯示
            document.getElementById('currentRod').textContent = rod.name;
            
            return true;
        }
        return false;
    },
    
    // 購買新釣竿
    buyRod: function(rodName) {
        // 檢查釣竿是否已解鎖
        if (window.GameData.isRodUnlocked(rodName)) {
            // 已經擁有該釣竿，直接裝備
            this.setCurrentRod(rodName);
            return { success: true, message: `已裝備 ${rodName}` };
        }
        
        // 獲取釣竿數據
        const rod = window.GameData.getRodByName(rodName);
        if (!rod) {
            return { success: false, message: `找不到釣竿: ${rodName}` };
        }
        
        // 檢查金錢是否足夠
        if (window.gameData.money < rod.price) {
            return { success: false, message: `金錢不足，無法購買 ${rodName}` };
        }
        
        // 購買釣竿
        window.gameData.money -= rod.price;
        window.gameData.unlockedRods.push(rodName);
        this.setCurrentRod(rodName);
        
        // 更新UI
        document.getElementById('money').textContent = window.gameData.money;
        
        return { success: true, message: `成功購買並裝備 ${rodName}` };
    },
    
    // 獲取已解鎖的釣竿列表
    getUnlockedRods: function() {
        return window.gameData.unlockedRods;
    },
    
    // 獲取釣竿的力量值
    getRodPower: function(rodName) {
        const rod = window.GameData.getRodByName(rodName);
        return rod ? rod.power : 0;
    },
    
    // 獲取當前釣竿的力量值
    getCurrentRodPower: function() {
        return window.gameData.currentRod.power;
    }
};