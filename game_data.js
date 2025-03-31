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
    version: "indev-250331", // 版本號
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
        { name: "河豚", rarity: "不常見的", color: "#4CAF50", basePrice: 50, decayRate: 0.4, weightRange: [0.5, 8], chance: 0.2 }
    ],
    深海: [
        { name: "金槍魚", rarity: "稀有", color: "#2196F3", basePrice: 100, decayRate: 0.5, weightRange: [5, 50], chance: 0.2 },
        { name: "鯊魚", rarity: "傳奇", color: "#FFEB3B", basePrice: 1000, decayRate: 0.6, weightRange: [50, 200], chance: 0.1 }
    ],
    珊瑚礁: [
        { name: "熱帶魚", rarity: "常見的", color: "#808080", basePrice: 10, decayRate: 0.3, weightRange: [0.1, 2], chance: 0.4 },
        { name: "章魚", rarity: "稀有", color: "#2196F3", basePrice: 100, decayRate: 0.5, weightRange: [1, 10], chance: 0.2 }
    ],
    湖泊: [
        { name: "黑鱸魚", rarity: "常見的", color: "#808080", basePrice: 10, decayRate: 0.3, weightRange: [0.5, 5], chance: 0.4 },
        { name: "鱘魚", rarity: "不常見的", color: "#4CAF50", basePrice: 50, decayRate: 0.4, weightRange: [2, 15], chance: 0.2 },
        { name: "巨型鯰魚", rarity: "神話", color: "#F44336", basePrice: 1500, decayRate: 1.0, weightRange: [10, 100], chance: 0.08 }
    ],
    河流: [
        { name: "鱒魚", rarity: "常見的", color: "#808080", basePrice: 10, decayRate: 0.3, weightRange: [0.2, 3], chance: 0.4 },
        { name: "鮭魚", rarity: "不常見的", color: "#4CAF50", basePrice: 50, decayRate: 0.4, weightRange: [1, 8], chance: 0.2 },
        { name: "彩虹魚", rarity: "神聖", color: "#3F51B5", basePrice: 10000, decayRate: 1.5, weightRange: [0.5, 5], chance: 0.02 }
    ],
    深淵: [
        { name: "深海鰻", rarity: "稀有", color: "#2196F3", basePrice: 100, decayRate: 0.5, weightRange: [1, 20], chance: 0.2 },
        { name: "發光魚", rarity: "傳奇", color: "#FFEB3B", basePrice: 1000, decayRate: 0.6, weightRange: [0.5, 10], chance: 0.1 },
        { name: "深淵巨獸", rarity: "神話", color: "#F44336", basePrice: 1500, decayRate: 1.0, weightRange: [50, 500], chance: 0.08 },
        { name: "幽靈魚", rarity: "*極限", color: "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)", basePrice: 100000, decayRate: 2, weightRange: [0.1, 1], chance: 0 }
    ],
    冰湖: [
        { name: "冰魚", rarity: "常見的", color: "#808080", basePrice: 10, decayRate: 0.3, weightRange: [0.2, 3], chance: 0.4 },
        { name: "雪花魚", rarity: "稀有", color: "#2196F3", basePrice: 100, decayRate: 0.5, weightRange: [0.5, 5], chance: 0.2 },
        { name: "冰晶龍魚", rarity: "神聖", color: "#3F51B5", basePrice: 10000, decayRate: 1.5, weightRange: [1, 10], chance: 0.02 }
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

// 導出遊戲數據
window.GameData = {
    default: gameDataDefault,
    rods: rods,
    fishes: fishes,
    travelCosts: travelCosts,
    
    // 初始化遊戲數據
    initGameData: function() {
        // 如果window.gameData不存在，則初始化為默認值
        if (!window.gameData) {
            window.gameData = JSON.parse(JSON.stringify(this.default));
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
    }
};