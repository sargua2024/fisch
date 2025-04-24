// 更新日誌系統

// 更新日誌數據
const changelogData = [
    {
        version: 'indev-250425',
        date: '2025/4/25',
        changes: [
            '增加藥水系統',
            '正在籌畫任務系統、每日登入獎勵，預計於下個版本加入'        ]
    },
    {
        version: 'indev-250401',
        date: '2025/4/1',
        changes: [
            '增加等級系統',
            '釣魚竿改為解鎖制，已經買過的釣魚竿不需要再購買',
            '簡化了商店與傳送介面的顯示',
            '新增了更多魚類'        ]
    },
    {
        version: 'indev-250331',
        date: '2025/3/31',
        changes: [
            '增加等級系統',
            '改善遊戲平衡',
            '作者再喝了2000杯咖啡(沒有)'
        ]
    },
    {
        version: 'indev-250328',
        date: '2025/3/28',
        changes: [
            '修復釣魚進度條歸零釣魚不會失效的bug',
            '重寫釣魚系統，添加了稀有度與重量機制',
            '作者多喝了2000杯咖啡(並沒有)'
        ]
    },
    {
        version: 'indev-250326',
        date: '2025/3/26',
        changes: [
            '首個有更新日誌的版本',
            '改善存檔系統',
            '新增聯絡作者功能',
            '新增廣告位置',
        ]
    }
];

// 創建更新日誌按鈕
function createChangelogButton() {
    const button = document.createElement('button');
    button.id = 'changelogButton';
    button.textContent = '更新日誌';
    button.style.position = 'fixed';
    button.style.bottom = '40px';
    button.style.right = '20px';
    button.style.padding = '8px 15px';
    button.style.backgroundColor = '#4CAF50';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';
    button.style.zIndex = '1000';
    button.style.fontSize = '14px';
    button.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    
    button.onmouseover = () => {
        button.style.backgroundColor = '#45a049';
    };
    
    button.onmouseout = () => {
        button.style.backgroundColor = '#4CAF50';
    };
    
    button.onclick = showChangelog;
    
    document.body.appendChild(button);
}

// 顯示更新日誌模態框
function showChangelog() {
    // 創建模態框容器
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.style.display = 'flex';
    modal.style.opacity = '1';
    modal.style.pointerEvents = 'auto';
    modal.classList.add('show');
    modal.style.zIndex = '5000';
    
    // 創建模態框內容
    const content = document.createElement('div');
    content.className = 'modal-content';
    content.style.maxHeight = '80vh';
    content.style.overflowY = 'auto';
    content.style.width = '90%';
    content.style.maxWidth = '600px';
    content.style.transform = 'translateY(0)';
    content.style.opacity = '1';
    
    // 創建關閉按鈕
    const closeButton = document.createElement('span');
    closeButton.className = 'notification-close';
    closeButton.innerHTML = 'X';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '15px';
    closeButton.style.color = 'red';
    closeButton.style.cursor = 'pointer';
    closeButton.style.fontSize = '18px';
    closeButton.style.lineHeight = '1';
    closeButton.onclick = () => {
        modal.classList.remove('show');
        setTimeout(() => {
            if (modal.parentNode) {
                modal.parentNode.removeChild(modal);
            }
        }, 300);
    };
    
    // 創建標題
    const title = document.createElement('h2');
    title.textContent = '更新日誌';
    title.style.marginTop = '0';
    title.style.marginBottom = '20px';
    title.style.color = '#333';
    
    content.appendChild(closeButton);
    content.appendChild(title);
    
    // 添加更新日誌內容
    changelogData.forEach(log => {
        const versionContainer = document.createElement('div');
        versionContainer.style.marginBottom = '20px';
        versionContainer.style.padding = '15px';
        versionContainer.style.backgroundColor = '#f5f5f5';
        versionContainer.style.borderRadius = '5px';
        
        const versionHeader = document.createElement('div');
        versionHeader.style.marginBottom = '10px';
        versionHeader.innerHTML = `<strong>版本 ${log.version}</strong> - ${log.date}`;
        versionHeader.style.color = '#2196F3';
        
        const changesList = document.createElement('ul');
        changesList.style.margin = '0';
        changesList.style.paddingLeft = '20px';
        
        log.changes.forEach(change => {
            const changeItem = document.createElement('li');
            changeItem.textContent = change;
            changeItem.style.marginBottom = '5px';
            changesList.appendChild(changeItem);
        });
        
        versionContainer.appendChild(versionHeader);
        versionContainer.appendChild(changesList);
        content.appendChild(versionContainer);
    });
    
    modal.appendChild(content);
    document.body.appendChild(modal);
    
    // 點擊模態框外部關閉
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }
    });
}

// 初始化更新日誌系統
function initChangelogSystem() {
    createChangelogButton();
}