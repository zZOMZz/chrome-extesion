// 打印日志
console.log('[content.js]');

// 创建挂载点，并将其附加到 Shadow DOM
const mountPoint = document.createElement("div");
mountPoint.id = "react-drawer-root";
const shadowHost = document.createElement("div");
shadowHost.id = "shadow-host";
document.body.appendChild(shadowHost);

// 将路径传递到页面的 Drawer 中
const videoSrc = chrome.runtime.getURL("video/output.mp4");
console.log('[content.js] Video source:', videoSrc);
shadowHost.setAttribute("data-video-src", videoSrc);

// 创建 Shadow DOM 并附加挂载点
const shadowRoot = shadowHost.attachShadow({ mode: "open" });
shadowRoot.appendChild(mountPoint);

// 加载 React 应用的脚本
const script = document.createElement("script");
script.src = chrome.runtime.getURL("assets/main.js");
script.type = "module";
shadowRoot.appendChild(script);

// 动态加载 Tailwind CSS
const style = document.createElement("link");
style.rel = "stylesheet";
style.href = chrome.runtime.getURL("assets/main.css");
shadowRoot.appendChild(style);

const sendRequest = async (action, payload = {}) => {
  try {
    let response;
    switch (action) {
      case "getSiteType":
        response = await fetch("https://dev06.se.tjcorp.qihoo.net:8000/v1/analyze-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: payload.url }),
        });
        break;

      case "getDocument":
        response = await fetch("https://dev06.se.tjcorp.qihoo.net:8000/v1/analyze_website", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url: payload.url }),
        });
        break;

      case "getFileNames":
        const fileUrl = `https://dev06.se.tjcorp.qihoo.net/${payload.site}`;
        response = await fetch(`https://dev06.se.tjcorp.qihoo.net:8000/v1/files/by-url?url=${encodeURIComponent(fileUrl)}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        break;

      case "getReport":
        response = await fetch(`https://dev06.se.tjcorp.qihoo.net:8000/v1/report/${payload.id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        break;

      case "getAudio":
        response = await fetch(`https://dev06.se.tjcorp.qihoo.net:8000/v1/audio/${payload.src}`, { method: "GET" });
        const audioBlob = await response.blob();
        return { success: true, data: audioBlob };

      case "getImage":
        response = await fetch(`https://dev06.se.tjcorp.qihoo.net:8000/v1/images/${payload.src}`, { method: "GET" });
        const imageBlob = await response.blob();
        const objectUrl = URL.createObjectURL(imageBlob); // 创建 Object URL
        return { success: true, data: objectUrl };

      default:
        throw new Error("Unknown action");
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// 监听页面消息并处理
window.addEventListener("message", async (event) => {
  // 确保消息来源是页面，且带有 `action` 属性
  if (event.source !== window || !event.data || !event.data.action) return;

  const { action, payload } = event.data;
  console.log("[content.js] Received message from page:", event.data);

  const result = await sendRequest(action, payload);

  // 将结果返回给页面
  console.log("[content.js] Sending response to page:", result);
  window.postMessage({ type: "FROM_CONTENT", ...result });
});


console.log('[content.js] Shadow DOM set up completed.');
