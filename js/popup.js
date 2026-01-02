document.addEventListener('DOMContentLoaded', function() {
    // 修改 KEY 名稱，避免跟舊的設定衝突，確保大家都能看到新版邏輯
    var STORAGE_KEY = 'heavencompile_popup_last_hidden_date';

    // 取得今天的日期字串 (例如: "Fri Jan 02 2026")
    var today = new Date().toDateString();

    // 1. 檢查是否已經在"今天"勾選過
    var lastHiddenDate = localStorage.getItem(STORAGE_KEY);
    if (lastHiddenDate === today) {
        return; // 如果紀錄的日期是今天，直接結束，不顯示彈窗
    }

    // 2. 加入 CSS 樣式
    var style = document.createElement('style');
    style.innerHTML = `
        /* 遮罩層 */
        .custom-popup-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.6); /* 半透明黑色背景 */
            z-index: 99999; /* 確保在最上層 */
            display: flex;
            justify-content: center;
            align-items: center;
            opacity: 0;
            animation: fadeIn 0.3s forwards;
        }
        /* 彈窗本體 */
        .custom-popup-content {
            background-color: #fff;
            padding: 25px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            width: 90%;
            max-width: 500px; /* 最大寬度 */
            text-align: center;
            position: relative;
        }
        /* 關閉按鈕 */
        .custom-popup-close {
            position: absolute;
            top: 10px;
            right: 15px;
            font-size: 24px;
            font-weight: bold;
            color: #888;
            cursor: pointer;
            transition: color 0.2s;
        }
        .custom-popup-close:hover { color: #000; }
        /* 圖片樣式 */
        .custom-popup-img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin-bottom: 15px;
        }
        /* 文字樣式 */
        .custom-popup-text {
            font-size: 16px;
            color: #333;
            line-height: 1.6;
            margin-bottom: 15px;
        }
        /* 底部勾選區 */
        .custom-popup-footer {
            margin-top: 15px;
            font-size: 14px;
            color: #666;
            border-top: 1px solid #eee;
            padding-top: 10px;
        }
        @keyframes fadeIn { to { opacity: 1; } }
    `;
    document.head.appendChild(style);

    // 3. 建立彈窗 HTML 結構
    var overlay = document.createElement('div');
    overlay.className = 'custom-popup-overlay';
    
    // --- 這裡可以自訂內容 ---
    var imgSrc = "https://telegraph-image-1n0.pages.dev/file/AgACAgUAAyEGAAS3SV8sAAICX2lXPToksWcNVvDr1nbjJSqaERPAAAKFC2sbZkC4VsJzx_XAUAXjAQADAgADeQADOAQ.jpg"; 
    var titleText = "✨ 路西法天堂：墮落是為了更強的重生 ✨";
    var bodyText = "<p style='color: #D50000; font-weight: bold; font-size: 18px; margin-bottom: 10px;'>⚔️ 英雄集結，誰敢來戰？ ⚔️</p>" +
               "<hr>" +
               "<b>📅 伺服器列表：</b><br>" +
               "🚀 12/28 — <b>光明與黑暗</b><br>" +
               "🔥 01/03 — <b>無盡伺服器-即將開服</b><br>" +
               "<hr>" +
               "本服為<b>長期定居伺服器</b>，每月預計新增 1-2 個分服導流玩家。<br>" +
               "我們致力於穩定營運，有任何問題歡迎隨時洽詢官方客服。" +
               "官方LINE@: <a href='https://lin.ee/vvWk1Vs' target='_blank' style='color: #0066cc; text-decoration: underline; font-weight: bold;'>@466lwupr</a>";
    // ----------------------

    overlay.innerHTML = `
        <div class="custom-popup-content">
            <span class="custom-popup-close">&times;</span>
            <h3 style="margin-top:0; margin-bottom:10px;">${titleText}</h3>
            <img src="${imgSrc}" class="custom-popup-img" alt="公告">
            <div class="custom-popup-text">${bodyText}</div>
            <div class="custom-popup-footer">
                <label style="cursor:pointer; display:flex; align-items:center; justify-content:center; gap:5px;">
                    <input type="checkbox" id="popup-dont-show"> 
                    今日不再顯示此視窗 </label>
            </div>
        </div>
    `;

    // 4. 綁定關閉事件
    var closeBtn = overlay.querySelector('.custom-popup-close');
    var checkbox = overlay.querySelector('#popup-dont-show');

    function closePopup() {
        // 如果勾選了，寫入"今天的日期"
        if (checkbox.checked) {
            localStorage.setItem(STORAGE_KEY, today);
        }
        // 移除彈窗
        overlay.style.opacity = '0';
        setTimeout(function() {
            if (document.body.contains(overlay)) {
                document.body.removeChild(overlay);
            }
        }, 300);
    }

    closeBtn.addEventListener('click', closePopup);
    
    // 點擊背景也可以關閉
    overlay.addEventListener('click', function(e) {
        if (e.target === overlay) {
            closePopup();
        }
    });

    // 將彈窗加入頁面
    document.body.appendChild(overlay);
});