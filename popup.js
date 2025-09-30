function gearToSpeed(gear) {
    const minInterval = 5;     // 最快
    const maxInterval = 400;   // 最慢
    return maxInterval - ((gear - 1) * (maxInterval - minInterval) / 99);
}

async function sendMessageToTab(message) {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.tabs.sendMessage(tab.id, message);
}

document.getElementById("start").addEventListener("click", () => {
    const gear = parseInt(document.getElementById("speed").value, 10);
    const direction = parseInt(document.getElementById("direction").value, 10);

    const speed = gearToSpeed(gear); // 转换成 ms

    sendMessageToTab({ action: "start", speed, direction });
});

document.getElementById("stop").addEventListener("click", () => {
    sendMessageToTab({ action: "stop" });
});
