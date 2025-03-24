// 通知系統

// 創建通知容器
function createNotificationContainer() {
    // 檢查是否已存在通知容器
    if (document.getElementById('notificationContainer')) {
        return;
    }
    
    // 創建通知容器
    const container = document.createElement('div');
    container.id = 'notificationContainer';
    container.style.position = 'fixed';
    container.style.top = '20px';
    container.style.right = '20px';
    container.style.zIndex = '2000';
    container.style.maxWidth = '300px';
    container.style.width = '100%';
    
    document.body.appendChild(container);
    
    // 添加通知樣式
    const style = document.createElement('style');
    style.textContent = `
        .game-notification {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            margin-bottom: 10px;
            overflow: hidden;
            transform: translateX(120%);
            transition: transform 0.3s ease;
            position: relative;
        }
        
        .game-notification.show {
            transform: translateX(0);
        }
        
        .game-notification.hide {
            transform: translateX(120%);
        }
        
        .notification-header {
            padding: 10px 15px;
            background: linear-gradient(to right, #2e8cb8, #4CAF50);
            color: white;
            font-weight: bold;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .notification-close {
            cursor: pointer;
            font-size: 18px;
            line-height: 1;
        }
        
        .notification-body {
            padding: 15px;
            color: #333;
        }
        
        .notification-success .notification-header {
            background: linear-gradient(to right, #4CAF50, #8BC34A);
        }
        
        .notification-error .notification-header {
            background: linear-gradient(to right, #f44336, #ff9800);
        }
        
        .notification-info .notification-header {
            background: linear-gradient(to right, #2196F3, #03A9F4);
        }
        
        .notification-warning .notification-header {
            background: linear-gradient(to right, #FF9800, #FFC107);
        }
        
        @media (max-width: 600px) {
            #notificationContainer {
                max-width: 90%;
                right: 5%;
            }
        }
    `;
    document.head.appendChild(style);
}

// 顯示通知
function showNotification(message, type = 'info', title = '通知', duration = 3000) {
    // 確保通知容器已創建
    createNotificationContainer();
    
    const container = document.getElementById('notificationContainer');
    
    // 創建通知元素
    const notification = document.createElement('div');
    notification.className = `game-notification notification-${type}`;
    
    // 創建通知頭部
    const header = document.createElement('div');
    header.className = 'notification-header';
    
    const titleSpan = document.createElement('span');
    titleSpan.textContent = title;
    header.appendChild(titleSpan);
    
    const closeButton = document.createElement('span');
    closeButton.className = 'notification-close';
    closeButton.innerHTML = 'X';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '15px';
    closeButton.style.color = 'red';
    closeButton.onclick = () => closeNotification(notification);
    header.appendChild(closeButton);
    
    notification.appendChild(header);
    
    // 創建通知內容
    const body = document.createElement('div');
    body.className = 'notification-body';
    body.textContent = message;
    notification.appendChild(body);
    
    // 添加到容器
    container.appendChild(notification);
    
    // 顯示通知（使用setTimeout確保DOM更新後再添加show類）
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // 設置自動關閉
    if (duration > 0) {
        setTimeout(() => {
            closeNotification(notification);
        }, duration);
    }
    
    return notification;
}

// 關閉通知
function closeNotification(notification) {
    notification.classList.remove('show');
    notification.classList.add('hide');
    
    // 等待動畫完成後移除元素
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

// 替代alert的函數
function gameAlert(message, type = 'info', title = '通知', duration = 3000) {
    return showNotification(message, type, title, duration);
}