"use strict";
console.log('background script loaded');
// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   const { action, payload } = message;
//   console.log('message:', message);

//   const fetchData = async () => {
//     try {
//       let res;
//       switch (action) {
//         case "getSiteType":
//           console.log('getSiteType payload:', payload);
//           try {
//             res = await fetch('http://dev06.se.tjcorp.qihoo.net:8000/v1/analyze-intent', {
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify({ url: payload.url }),
//             });
//           } catch (error) {
//             console.error('getSiteType error:', error);
//             throw error;
//           }
//           console.log('getSiteType res:', res);
//           break;

//         case "getDocument":
//           res = await fetch('http://dev06.se.tjcorp.qihoo.net:8000/v1/analyze_website', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ url: payload.url }),
//           });
//           break;

//         case "getFileNames":
//           const fileUrl = `https://dev06.se.tjcorp.qihoo.net/${payload.site}`;
//           res = await fetch(`http://dev06.se.tjcorp.qihoo.net:8000/v1/files/by-url?url=${encodeURIComponent(fileUrl)}`, {
//             method: 'GET',
//             headers: { 'Content-Type': 'application/json' },
//           });
//           break;

//         case "getReport":
//           res = await fetch(`http://dev06.se.tjcorp.qihoo.net:8000/v1/report/${payload.id}`, {
//             method: 'GET',
//             headers: { 'Content-Type': 'application/json' },
//           });
//           break;

//         case "getAudio":
//           res = await fetch(`http://dev06.se.tjcorp.qihoo.net:8000/v1/audio/${payload.src}`, { method: 'GET' });
//           const audioBlob = await res.blob();
//           sendResponse({ success: true, data: audioBlob });
//           return; // 结束执行，直接返回 Blob

//         case "getImage":
//           res = await fetch(`http://dev06.se.tjcorp.qihoo.net:8000/v1/images/${payload.src}`, { method: 'GET' });
//           console.log('get Image [background.js]', res);

//           const imageBlob = await res.blob();
//           console.log('get Image [background.js] imageBlob:', imageBlob);
//           const objectUrl = URL.createObjectURL(imageBlob); // 创建一个本地 URL
//           console.log('get Image [background.js] objectUrl:', objectUrl);
//           sendResponse({ success: true, data: objectUrl });
//           return; // 结束执行，直接返回 Blob

//         default:
//           throw new Error("Unknown action");
//       }

//       const data = await res.json();
//       sendResponse({ success: true, data });
//     } catch (error) {
//       sendResponse({ success: false, error: error.message });
//     }
//   };

//   fetchData();
//   return true; // 表示异步响应
// });

