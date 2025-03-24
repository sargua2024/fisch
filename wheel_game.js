// 轉盤遊戲相關功能

// 創建轉盤遊戲模態框
function createWheelGameModal() {
    // 檢查是否已存在轉盤模態框
    if (document.getElementById('wheelGameModal')) {
        return;
    }
    
    // 創建轉盤遊戲模態框
    const wheelModal = document.createElement('div');
    wheelModal.id = 'wheelGameModal';
    wheelModal.className = 'modal';
    
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.textAlign = 'center';
    modalContent.style.width = '90%';
    modalContent.style.maxWidth = '500px';
    // 移除margin設定，由flexbox控制置中
    
    // 添加媒體查詢樣式
    const mediaStyle = document.createElement('style');
    mediaStyle.textContent = `
        @media (max-width: 600px) {
            .modal-content {
襖襖                width: 95%;
                padding: 15px;
                /* 移除margin設定，由flexbox控制置中 */
            }
            #wheelContainer {
                width: 90%;
            }
            #spinButton, button {
                padding: 8px 15px;
                font-size: 14px;
            }
        }
    `;
    document.head.appendChild(mediaStyle);
    
    const modalTitle = document.createElement('h2');
    modalTitle.textContent = '幸運轉盤';
    modalContent.appendChild(modalTitle);
    
    const modalDesc = document.createElement('p');
    modalDesc.textContent = '轉動轉盤，看看你的運氣如何！';
    modalDesc.style.marginBottom = '20px';
    modalContent.appendChild(modalDesc);
    
    // 創建轉盤容器
    const wheelContainer = document.createElement('div');
    wheelContainer.id = 'wheelContainer';
    wheelContainer.style.position = 'relative';
    wheelContainer.style.width = '80%';
    wheelContainer.style.maxWidth = '300px';
    wheelContainer.style.height = 'auto';
    wheelContainer.style.aspectRatio = '1/1';
    wheelContainer.style.margin = '0 auto 20px';
    
    // 創建轉盤
    const wheel = document.createElement('canvas');
    wheel.id = 'wheel';
    wheel.style.width = '100%';
    wheel.style.height = '100%';
    // 設置初始畫布大小，稍後會在調整大小函數中更新
    wheel.width = 300;
    wheel.height = 300;
    wheelContainer.appendChild(wheel);
    
    // 創建指針
    const pointer = document.createElement('div');
    pointer.id = 'wheelPointer';
    pointer.style.position = 'absolute';
    pointer.style.bottom = '10px';
    pointer.style.left = '50%';
    pointer.style.transform = 'translateX(-50%) rotate(180deg)';
    pointer.style.width = '0';
    pointer.style.height = '0';
    pointer.style.borderLeft = 'calc(3% + 5px) solid transparent';
    pointer.style.borderRight = 'calc(3% + 5px) solid transparent';
    pointer.style.borderTop = 'calc(6% + 10px) solid red';
    pointer.style.zIndex = '10';
    wheelContainer.appendChild(pointer);
    
    modalContent.appendChild(wheelContainer);
    
    // 創建轉動按鈕
    const spinButton = document.createElement('button');
    spinButton.id = 'spinButton';
    spinButton.textContent = '轉動';
    spinButton.style.padding = '10px 20px';
    spinButton.style.fontSize = '16px';
    spinButton.style.marginBottom = '15px';
    modalContent.appendChild(spinButton);
    
    // 創建結果顯示區域
    const resultDiv = document.createElement('div');
    resultDiv.id = 'wheelResult';
    resultDiv.style.fontWeight = 'bold';
    resultDiv.style.fontSize = '18px';
    resultDiv.style.marginBottom = '15px';
    resultDiv.style.minHeight = '27px';
    modalContent.appendChild(resultDiv);
    
    // 添加右上角關閉按鈕
    const closeButton = document.createElement('span');
    closeButton.textContent = 'X';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '15px';
    closeButton.style.color = 'red';
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontWeight = 'bold';
    closeButton.onclick = closeWheelGame;
    modalContent.appendChild(closeButton);
    
    wheelModal.appendChild(modalContent);
    document.body.appendChild(wheelModal);
    
    // 調整轉盤大小以適應畫面
    adjustWheelSize();
    
    // 添加視窗大小變化的事件監聽器
    window.addEventListener('resize', adjustWheelSize);
}

// 調整轉盤大小以適應畫面
function adjustWheelSize() {
    const wheelContainer = document.getElementById('wheelContainer');
    if (!wheelContainer) return;
    
    const wheel = document.getElementById('wheel');
    if (!wheel) return;
    
    // 獲取容器的實際大小
    const containerWidth = wheelContainer.clientWidth;
    
    // 更新畫布大小
    wheel.width = containerWidth;
    wheel.height = containerWidth;
    
    // 如果轉盤已經繪製，則重新繪製
    if (window.currentFish) {
        drawWheel();
    }
}

// 打開轉盤遊戲
function openWheelGame(fish) {
    createWheelGameModal();
    
    const wheelModal = document.getElementById('wheelGameModal');
    const resultDiv = document.getElementById('wheelResult');
    const spinButton = document.getElementById('spinButton');
    
    // 重置結果顯示
    resultDiv.textContent = '';
    resultDiv.style.color = '#333';
    
    // 設置當前魚的數據
    window.currentFish = fish;
    
    // 繪製轉盤
    drawWheel();
    
    // 設置轉動按鈕事件
    spinButton.onclick = spinWheel;
    
    // 顯示模態框
    wheelModal.style.display = 'flex';
    setTimeout(() => {
        wheelModal.classList.add('show');
        // 調整轉盤大小
        adjustWheelSize();
    }, 10);
}

// 關閉轉盤遊戲
function closeWheelGame() {
    // 移除視窗大小變化的事件監聽器
    window.removeEventListener('resize', adjustWheelSize);
    const wheelModal = document.getElementById('wheelGameModal');
    if (!wheelModal) return;
    
    wheelModal.classList.remove('show');
    // 如果有待處理的魚，先完成處理
    if (window.currentFish && window.wheelResult) {
        completeWheelGame(window.currentFish, window.wheelResult);
        window.currentFish = null;
        window.wheelResult = null;
    }
    
    setTimeout(() => {
        wheelModal.style.display = 'none';
    }, 300);
}

// 繪製轉盤
function drawWheel() {
    const canvas = document.getElementById('wheel');
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const radius = Math.min(width, height) / 2;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // 轉盤選項
    const segments = [
        { text: '2倍', color: '#4CAF50', multiplier: 2 },
        { text: '0.5倍', color: '#FF9800', multiplier: 0.5 },
        { text: '1.5倍', color: '#2196F3', multiplier: 1.5 },
        { text: '0倍', color: '#F44336', multiplier: 0 },
        { text: '1倍', color: '#9C27B0', multiplier: 1 },
        { text: '3倍', color: '#FFEB3B', multiplier: 3 }
    ];
    
    const segmentAngle = 2 * Math.PI / segments.length;
    
    // 清除畫布
    ctx.clearRect(0, 0, width, height);
    
    // 繪製每個扇形
    for (let i = 0; i < segments.length; i++) {
        const startAngle = i * segmentAngle;
        const endAngle = (i + 1) * segmentAngle;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.closePath();
        
        ctx.fillStyle = segments[i].color;
        ctx.fill();
        ctx.stroke();
        
        // 繪製文字
        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(startAngle + segmentAngle / 2);
        ctx.textAlign = 'right';
        ctx.fillStyle = '#fff';
        // 根據畫布大小調整字體大小
        const fontSize = Math.max(12, Math.floor(radius / 8));
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.fillText(segments[i].text, radius - (radius * 0.1), 5);
        ctx.restore();
    }
    
    // 繪製中心圓
    ctx.beginPath();
    ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
    ctx.fillStyle = '#fff';
    ctx.fill();
    ctx.stroke();
}

// 轉動轉盤
function spinWheel() {
    const canvas = document.getElementById('wheel');
    const spinButton = document.getElementById('spinButton');
    const resultDiv = document.getElementById('wheelResult');
    
    // 禁用轉動按鈕
    spinButton.disabled = true;
    
    // 清除結果
    resultDiv.textContent = '';
    
    // 轉盤選項
    const segments = [
        { text: '2倍', color: '#4CAF50', multiplier: 2 },
        { text: '0.5倍', color: '#FF9800', multiplier: 0.5 },
        { text: '1.5倍', color: '#2196F3', multiplier: 1.5 },
        { text: '0倍', color: '#F44336', multiplier: 0 },
        { text: '1倍', color: '#9C27B0', multiplier: 1 },
        { text: '3倍', color: '#FFEB3B', multiplier: 3 }
    ];
    
    // 隨機選擇一個結果
    const segmentIndex = Math.floor(Math.random() * segments.length);
    const selectedSegment = segments[segmentIndex];
    
    // 計算旋轉角度
    const segmentAngle = 2 * Math.PI / segments.length;
    const targetAngle = segmentIndex * segmentAngle;
    
    // 添加額外旋轉以確保至少轉動幾圈
    const extraRotation = 2 * Math.PI * 5; // 5圈
    const finalAngle = extraRotation + targetAngle;
    
    // 設置動畫參數
    let currentAngle = 0;
    const duration = 3000; // 3秒
    const startTime = Date.now();
    
    // 動畫函數
    function animate() {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // 使用緩動函數使轉盤逐漸減速
        const easeOut = function(t) {
            return 1 - Math.pow(1 - t, 3);
        };
        
        currentAngle = easeOut(progress) * finalAngle;
        
        // 旋轉畫布並重繪轉盤
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);
        
        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.rotate(currentAngle);
        ctx.translate(-width / 2, -height / 2);
        
        // 重繪轉盤
        const segments = [
            { text: '2倍', color: '#4CAF50', multiplier: 2 },
            { text: '0.5倍', color: '#FF9800', multiplier: 0.5 },
            { text: '1.5倍', color: '#2196F3', multiplier: 1.5 },
            { text: '0倍', color: '#F44336', multiplier: 0 },
            { text: '1倍', color: '#9C27B0', multiplier: 1 },
            { text: '3倍', color: '#FFEB3B', multiplier: 3 }
        ];
        
        const radius = Math.min(width, height) / 2;
        const centerX = width / 2;
        const centerY = height / 2;
        const segmentAngle = 2 * Math.PI / segments.length;
        
        // 繪製每個扇形
        for (let i = 0; i < segments.length; i++) {
            const startAngle = i * segmentAngle;
            const endAngle = (i + 1) * segmentAngle;
            
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, startAngle, endAngle);
            ctx.closePath();
            
            ctx.fillStyle = segments[i].color;
            ctx.fill();
            ctx.stroke();
            
            // 繪製文字
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(startAngle + segmentAngle / 2);
            ctx.textAlign = 'right';
            ctx.fillStyle = '#fff';
            // 根據畫布大小調整字體大小
            const fontSize = Math.max(12, Math.floor(radius / 8));
            ctx.font = `bold ${fontSize}px Arial`;
            ctx.fillText(segments[i].text, radius - (radius * 0.1), 5);
            ctx.restore();
        }
        
        // 繪製中心圓
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius * 0.1, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.stroke();
        
        ctx.restore();
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            // 動畫結束，顯示結果
            spinButton.disabled = false;
            
            // 設置結果
            resultDiv.textContent = `結果：${selectedSegment.text}！`;
            resultDiv.style.color = selectedSegment.color;
            
            // 保存結果
            window.wheelResult = selectedSegment.multiplier;
            
            // 1秒後自動關閉轉盤
            setTimeout(() => {
                closeWheelGame();
            }, 1000);
        }
    }
    
    // 開始動畫
    animate();
}

// 完成轉盤遊戲並處理結果
function completeWheelGame(fish, multiplier) {
    // 確保能夠訪問到全局的gameData變量
    if (typeof window.gameData === 'undefined') {
        console.error('無法訪問gameData變量，請確保已正確定義');
        return;
    }
    
    // 計算最終價格
    const finalPrice = Math.floor(fish.price * multiplier);
    
    // 從背包中移除魚
    const fishIndex = window.gameData.inventory.findIndex(f => f === fish);
    if (fishIndex !== -1) {
        window.gameData.inventory.splice(fishIndex, 1);
    }
    
    // 添加金錢
    window.gameData.money += finalPrice;
    
    // 更新背包顯示
    if (typeof window.updateInventory === 'function') {
        window.updateInventory();
    } else {
        console.error('無法找到updateInventory函數');
        // 刷新頁面以更新顯示
        setTimeout(() => location.reload(), 1000);
    }
    
    // 顯示結果訊息
    let message = '';
    if (multiplier > 1) {
        message = `恭喜！你的 ${fish.name} 賣出價格翻了 ${multiplier} 倍，獲得 ${finalPrice} 金幣！`;
    } else if (multiplier === 1) {
        message = `你的 ${fish.name} 賣出了原價 ${finalPrice} 金幣。`;
    } else if (multiplier === 0) {
        message = `太可惜了！你的 ${fish.name} 白送了，一分錢都沒得到！`;
    } else {
        message = `不太走運！你的 ${fish.name} 只賣出了 ${finalPrice} 金幣，只有原價的 ${multiplier} 倍。`;
    }
    
    gameAlert(message, 'info', '轉盤結果', 3000);
    
    // 自動保存遊戲
    if (typeof window.autoSaveGame === 'function') {
        setTimeout(window.autoSaveGame, 500); // 延遲0.5秒保存，確保UI更新完成
    }
}

// 修改賣出魚函數，添加轉盤遊戲機會
function sellFishWithWheel(fishName) {
    // 確保能夠訪問到全局的gameData變量
    if (typeof window.gameData === 'undefined') {
        console.error('無法訪問gameData變量，請確保已正確定義');
        return;
    }
    
    const fishIndex = window.gameData.inventory.findIndex(f => f.name === fishName);
    if (fishIndex !== -1) {
        const fish = window.gameData.inventory[fishIndex];
        
        // 檢查是否是第一次賣魚
        if (typeof window.gameData.firstFishSold === 'undefined') {
            window.gameData.firstFishSold = false;
        }
        
        // 如果是第一次賣魚，100%觸發轉盤遊戲，否則有30%的機會觸發
        const triggerWheel = !window.gameData.firstFishSold || Math.random() < 0.3;
        
        if (triggerWheel) {
            // 標記已經賣過魚了
            window.gameData.firstFishSold = true;
            // 打開轉盤遊戲
            openWheelGame(fish);
        } else {
            // 正常賣出魚
            window.gameData.money += fish.price;
            window.gameData.inventory.splice(fishIndex, 1);
            // 確保updateInventory函數存在
            if (typeof window.updateInventory === 'function') {
                window.updateInventory();
            } else {
                console.error('無法找到updateInventory函數');
                gameAlert(`你賣出了 ${fishName}，獲得 ${fish.price} 金幣。`, 'success', '交易成功', 3000);
                // 刷新頁面以更新顯示
                location.reload();
            }
        }
    }
}