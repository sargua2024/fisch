// 遊戲數據模組 - 集中管理所有遊戲數據

// 遊戲數據對象
const gameDataDefault = {
    money: 100,
    currentRod: {
        name: "新手釣竿",
        power: 1,
        price: 0
    },
    inventory: [],
    currentLocation: "淺灘",
    version: "indev-250425", // 版本號
    level: 1, // 玩家等級
    exp: 0, // 當前經驗值
    expThreshold: 100, // 升級所需經驗值門檻
    unlockedRods: ["新手釣竿"] // 已解鎖的釣竿列表
};

// 釣竿商店數據
const rods = [
    { name: "新手釣竿", power: 1, price: 0 },
    { name: "普通釣竿", power: 2, price: 200 },
    { name: "高級釣竿", power: 3, price: 500 },
    { name: "專業釣竿", power: 4, price: 1000 },
    { name: "碳纖維釣竿", power: 5, price: 2000 },
    { name: "鑽石釣竿", power: 7, price: 5000 },
    { name: "傳說釣竿", power: 10, price: 10000 }
];

// 魚類數據
const fishes = {
    淺灘: [
        { name: "小鯉魚", rarity: "常見的", color: "#808080", basePrice: 10, decayRate: 0.3, weightRange: [0.1, 10], chance: 0.4 },
        { name: "沙丁魚", rarity: "常見的", color: "#A9A9A9", basePrice: 12, decayRate: 0.25, weightRange: [0.1, 5], chance: 0.4 },
        { name: "蝦虎魚", rarity: "常見的", color: "#B0C4DE", basePrice: 8, decayRate: 0.2, weightRange: [0.05, 2], chance: 0.4 },
        { name: "孔雀魚", rarity: "常見的", color: "#FF6347", basePrice: 15, decayRate: 0.35, weightRange: [0.1, 3], chance: 0.4 },
        { name: "迷你鯰魚", rarity: "常見的", color: "#778899", basePrice: 7, decayRate: 0.15, weightRange: [0.1, 1.5], chance: 0.4 },
        { name: "日光魚", rarity: "常見的", color: "#FFD700", basePrice: 12, decayRate: 0.3, weightRange: [0.1, 4], chance: 0.4 },
        { name: "河豚", rarity: "不常見的", color: "#4CAF50", basePrice: 50, decayRate: 0.4, weightRange: [0.5, 8], chance: 0.2 },
        { name: "鯽魚", rarity: "不常見的", color: "#4682B4", basePrice: 40, decayRate: 0.35, weightRange: [0.3, 6], chance: 0.2 },
        { name: "銀魚", rarity: "不常見的", color: "#C0C0C0", basePrice: 60, decayRate: 0.45, weightRange: [0.2, 5], chance: 0.2 },
        { name: "花紋蝦", rarity: "不常見的", color: "#8B4513", basePrice: 55, decayRate: 0.5, weightRange: [0.1, 2], chance: 0.2 },
        { name: "箭魚", rarity: "不常見的", color: "#483D8B", basePrice: 45, decayRate: 0.4, weightRange: [0.4, 7], chance: 0.2 }
    ],
    深海: [
        { name: "金槍魚", rarity: "稀有", color: "#2196F3", basePrice: 100, decayRate: 0.5, weightRange: [5, 50], chance: 0.2 },
        { name: "劍魚", rarity: "稀有", color: "#4169E1", basePrice: 120, decayRate: 0.55, weightRange: [10, 60], chance: 0.2 },
        { name: "旗魚", rarity: "稀有", color: "#1E90FF", basePrice: 150, decayRate: 0.6, weightRange: [15, 70], chance: 0.2 },
        { name: "馬林魚", rarity: "稀有", color: "#00BFFF", basePrice: 180, decayRate: 0.65, weightRange: [20, 80], chance: 0.2 },
        { name: "鮪魚", rarity: "稀有", color: "#4682B4", basePrice: 200, decayRate: 0.7, weightRange: [25, 90], chance: 0.2 },
        { name: "鯊魚", rarity: "傳奇", color: "#FFEB3B", basePrice: 500, decayRate: 0.6, weightRange: [50, 200], chance: 0.1 },
        { name: "巨型章魚", rarity: "傳奇", color: "#FF8C00", basePrice: 600, decayRate: 0.7, weightRange: [30, 150], chance: 0.1 },
        { name: "深海巨鯨", rarity: "傳奇", color: "#9932CC", basePrice: 800, decayRate: 0.8, weightRange: [100, 300], chance: 0.1 },
        { name: "海龍", rarity: "傳奇", color: "#32CD32", basePrice: 700, decayRate: 0.75, weightRange: [40, 180], chance: 0.1 },
        { name: "海怪", rarity: "傳奇", color: "#8B0000", basePrice: 900, decayRate: 0.85, weightRange: [60, 250], chance: 0.1 }
    ],
    珊瑚礁: [
        { name: "熱帶魚", rarity: "常見的", color: "#808080", basePrice: 10, decayRate: 0.3, weightRange: [0.1, 2], chance: 0.4 },
        { name: "珊瑚魚", rarity: "常見的", color: "#FF69B4", basePrice: 12, decayRate: 0.25, weightRange: [0.1, 1.5], chance: 0.4 },
        { name: "藍點魚", rarity: "常見的", color: "#87CEEB", basePrice: 8, decayRate: 0.2, weightRange: [0.05, 1], chance: 0.4 },
        { name: "黃尾魚", rarity: "常見的", color: "#FFD700", basePrice: 15, decayRate: 0.35, weightRange: [0.1, 2.5], chance: 0.4 },
        { name: "條紋魚", rarity: "常見的", color: "#778899", basePrice: 9, decayRate: 0.15, weightRange: [0.1, 1.8], chance: 0.4 },
        { name: "彩虹珊瑚魚", rarity: "常見的", color: "#FF6347", basePrice: 18, decayRate: 0.4, weightRange: [0.1, 3], chance: 0.4 },
        { name: "珊瑚小丑魚", rarity: "常見的", color: "#9370DB", basePrice: 14, decayRate: 0.35, weightRange: [0.2, 2.2], chance: 0.4 },
        { name: "閃電珊瑚魚", rarity: "常見的", color: "#7FFFD4", basePrice: 17, decayRate: 0.3, weightRange: [0.15, 2], chance: 0.4 },
        { name: "葉子魚", rarity: "常見的", color: "#556B2F", basePrice: 11, decayRate: 0.28, weightRange: [0.08, 1.2], chance: 0.4 },
        { name: "蜂巢魚", rarity: "常見的", color: "#DAA520", basePrice: 16, decayRate: 0.32, weightRange: [0.2, 1.8], chance: 0.4 },
        { name: "薰衣草魚", rarity: "常見的", color: "#E6E6FA", basePrice: 14, decayRate: 0.36, weightRange: [0.1, 2.3], chance: 0.4 },
        { name: "章魚", rarity: "稀有", color: "#2196F3", basePrice: 100, decayRate: 0.5, weightRange: [1, 10], chance: 0.2 },
        { name: "海馬", rarity: "稀有", color: "#483D8B", basePrice: 120, decayRate: 0.55, weightRange: [0.8, 8], chance: 0.2 },
        { name: "珊瑚龍蝦", rarity: "稀有", color: "#8B4513", basePrice: 150, decayRate: 0.6, weightRange: [0.5, 5], chance: 0.2 },
        { name: "蝴蝶魚", rarity: "稀有", color: "#9932CC", basePrice: 180, decayRate: 0.65, weightRange: [0.3, 3], chance: 0.2 },
        { name: "鸚鵡魚", rarity: "稀有", color: "#32CD32", basePrice: 200, decayRate: 0.7, weightRange: [1.5, 12], chance: 0.2 },
        { name: "帝王珊瑚魚", rarity: "稀有", color: "#8A2BE2", basePrice: 220, decayRate: 0.65, weightRange: [2, 15], chance: 0.2 },
        { name: "彩虹海龍", rarity: "稀有", color: "#00FFFF", basePrice: 180, decayRate: 0.6, weightRange: [1, 12], chance: 0.2 },
        { name: "紫水晶魚", rarity: "稀有", color: "#9370DB", basePrice: 160, decayRate: 0.55, weightRange: [0.8, 10], chance: 0.2 },
        { name: "黃金海葵魚", rarity: "稀有", color: "#FFD700", basePrice: 240, decayRate: 0.7, weightRange: [1.2, 18], chance: 0.2 },
        { name: "翡翠章魚", rarity: "稀有", color: "#50C878", basePrice: 280, decayRate: 0.75, weightRange: [3, 20], chance: 0.2 }
    ],
    湖泊: [
        { name: "黑鱸魚", rarity: "常見的", color: "#808080", basePrice: 10, decayRate: 0.3, weightRange: [0.5, 5], chance: 0.4 },
        { name: "鱘魚", rarity: "不常見的", color: "#4CAF50", basePrice: 50, decayRate: 0.4, weightRange: [2, 15], chance: 0.2 },
        { name: "巨型鯰魚", rarity: "神話", color: "#F44336", basePrice: 1500, decayRate: 1.0, weightRange: [10, 100], chance: 0.08 }
    ],
    河流: [
        { name: "鱒魚", rarity: "常見的", color: "#808080", basePrice: 10, decayRate: 0.3, weightRange: [0.2, 3], chance: 0.4 },
        { name: "鮭魚", rarity: "不常見的", color: "#4CAF50", basePrice: 50, decayRate: 0.4, weightRange: [1, 8], chance: 0.2 },
        { name: "泥鰍", rarity: "不常見的", color: "#795548", basePrice: 40, decayRate: 0.5, weightRange: [0.1, 1], chance: 0.15 },
        { name: "河蟹", rarity: "稀有", color: "#9E9E9E", basePrice: 80, decayRate: 0.6, weightRange: [0.3, 2], chance: 0.1 },
        { name: "彩虹魚", rarity: "神聖", color: "#3F51B5", basePrice: 10000, decayRate: 1.5, weightRange: [0.5, 5], chance: 0.02 }
    ],
    深淵: [
        { name: "深海鰻", rarity: "稀有", color: "#2196F3", basePrice: 100, decayRate: 0.5, weightRange: [1, 20], chance: 0.2 },
        { name: "發光魚", rarity: "傳奇", color: "#FFEB3B", basePrice: 1000, decayRate: 0.6, weightRange: [0.5, 10], chance: 0.1 },
        { name: "深海龍蝦", rarity: "稀有", color: "#F44336", basePrice: 120, decayRate: 0.55, weightRange: [0.5, 5], chance: 0.15 },
        { name: "深淵巨獸", rarity: "神話", color: "#9C27B0", basePrice: 1500, decayRate: 1.0, weightRange: [50, 500], chance: 0.08 },
        { name: "幽靈魚", rarity: "*極限", color: "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)", basePrice: 100000, decayRate: 2, weightRange: [0.1, 1], chance: 0 }
    ],
    冰湖: [
        { name: "冰魚", rarity: "常見的", color: "#808080", basePrice: 10, decayRate: 0.3, weightRange: [0.2, 3], chance: 0.4 },
        { name: "雪鱒魚", rarity: "常見的", color: "#F5F5F5", basePrice: 8, decayRate: 0.25, weightRange: [0.1, 2], chance: 0.4 },
        { name: "冰晶魚", rarity: "常見的", color: "#ADD8E6", basePrice: 12, decayRate: 0.35, weightRange: [0.3, 4], chance: 0.4 },
        { name: "白點魚", rarity: "常見的", color: "#FFFFFF", basePrice: 9, decayRate: 0.2, weightRange: [0.2, 2.5], chance: 0.4 },
        { name: "藍冰魚", rarity: "常見的", color: "#1E90FF", basePrice: 15, decayRate: 0.4, weightRange: [0.1, 1.8], chance: 0.4 },
        
        { name: "雪花魚", rarity: "稀有", color: "#2196F3", basePrice: 100, decayRate: 0.5, weightRange: [0.5, 5], chance: 0.2 },
        { name: "冰霜魚", rarity: "稀有", color: "#87CEEB", basePrice: 120, decayRate: 0.55, weightRange: [0.8, 6], chance: 0.2 },
        { name: "極光魚", rarity: "稀有", color: "#7FFFD4", basePrice: 150, decayRate: 0.6, weightRange: [1, 8], chance: 0.2 },
        { name: "寒冰鯊", rarity: "稀有", color: "#B0E0E6", basePrice: 180, decayRate: 0.65, weightRange: [2, 10], chance: 0.2 },
        { name: "冰封魚", rarity: "稀有", color: "#4682B4", basePrice: 200, decayRate: 0.7, weightRange: [1.5, 12], chance: 0.2 },
        
        { name: "冰晶龍魚", rarity: "神聖", color: "#3F51B5", basePrice: 10000, decayRate: 1.5, weightRange: [1, 10], chance: 0.02 },
        { name: "永凍魚", rarity: "神聖", color: "#00FFFF", basePrice: 12000, decayRate: 1.6, weightRange: [2, 15], chance: 0.02 },
        { name: "冰霜巨龍", rarity: "神聖", color: "#4169E1", basePrice: 15000, decayRate: 1.7, weightRange: [3, 20], chance: 0.02 },
        { name: "極地守護者", rarity: "神聖", color: "#9932CC", basePrice: 18000, decayRate: 1.8, weightRange: [5, 25], chance: 0.02 },
        { name: "永恆冰晶魚", rarity: "神聖", color: "#FFFFFF", basePrice: 20000, decayRate: 2.0, weightRange: [8, 30], chance: 0.02 }
    ]
};

// 地點傳送費用
const travelCosts = {
    淺灘: 0, // 初始地點免費
    深海: 100,
    珊瑚礁: 150,
    湖泊: 50,
    河流: 80,
    深淵: 300,
    冰湖: 200
};

// 藥水數據
const potions = [
    {
        id: 'luck_potion_1',
        name: '幸運藥水 I',
        description: '增加25%的釣魚運氣',
        price: 200,
        icon: '🧪',
        effect: { type: 'luck', value: 0.25, duration: 5 } // 持續5次釣魚
    },
    {
        id: 'luck_potion_2',
        name: '幸運藥水 II',
        description: '增加50%的釣魚運氣',
        price: 500,
        icon: '🧪',
        effect: { type: 'luck', value: 0.5, duration: 5 } // 持續5次釣魚
    },
    {
        id: 'quick_hook_potion_1',
        name: '快速上鉤藥水 I',
        description: '點擊進度條時獲得雙倍力量加成',
        price: 300,
        icon: '⚡',
        effect: { type: 'power', value: 2, duration: 3 } // 持續3次釣魚
    }
];


// 導出遊戲數據
window.GameData = {
    default: gameDataDefault,
    rods: rods,
    fishes: fishes,
    travelCosts: travelCosts,
    potions: potions,
    
    // 初始化遊戲數據
    initGameData: function() {
        // 如果window.gameData不存在，則初始化為默認值
        if (!window.gameData) {
            window.gameData = JSON.parse(JSON.stringify(this.default));
            // 確保potions數組存在
            if (!window.gameData.potions) {
                window.gameData.potions = [];
            }
        }
        return window.gameData;
    },
    
    // 獲取當前釣竿數據
    getCurrentRod: function() {
        return window.gameData.currentRod;
    },
    
    // 獲取指定名稱的釣竿數據
    getRodByName: function(name) {
        return this.rods.find(rod => rod.name === name);
    },
    
    // 獲取當前地點的魚類數據
    getCurrentLocationFishes: function() {
        return this.fishes[window.gameData.currentLocation] || [];
    },
    
    // 獲取地點傳送費用
    getTravelCost: function(location) {
        return this.travelCosts[location] || 0;
    },
    
    // 檢查是否已解鎖釣竿
    isRodUnlocked: function(rodName) {
        return window.gameData.unlockedRods.includes(rodName);
    },
    
    // 獲取所有藥水數據
    getAllPotions: function() {
        return this.potions;
    },
    
    // 根據ID獲取藥水數據
    getPotionById: function(id) {
        return this.potions.find(potion => potion.id === id);
    },
    
    // 添加藥水到玩家背包
    addPotionToInventory: function(potionId) {
        const potion = this.getPotionById(potionId);
        if (potion) {
            if (!window.gameData.potions) {
                window.gameData.potions = [];
            }
            window.gameData.potions.push({
                id: potion.id,
                name: potion.name,
                description: potion.description,
                icon: potion.icon,
                effect: potion.effect
            });
            return true;
        }
        return false;
    },
    
    // 從玩家背包中移除藥水
    removePotionFromInventory: function(index) {
        if (window.gameData.potions && index >= 0 && index < window.gameData.potions.length) {
            window.gameData.potions.splice(index, 1);
            return true;
        }
        return false;
    }
};
