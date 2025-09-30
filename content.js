let scrollInterval = null;
console.log("✅ content.js 已经注入到页面");


function startScrolling(speed, direction) {
    if (scrollInterval) return; // 已经在滚动就不重复开
    scrollInterval = setInterval(() => {
        window.scrollBy(0, direction * 2); // 每次滚动 2 像素，方向取决于用户
    }, speed);
}

function stopScrolling() {
    clearInterval(scrollInterval);
    scrollInterval = null;
}

// 接收 popup 发来的消息
chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "start") {
        startScrolling(message.speed, message.direction);
    } else if (message.action === "stop") {
        stopScrolling();
    }
});
