const testUrl = "https://www.fusionfund.com/"
export const getSiteType = async (url: string = testUrl) => {
  const res = await fetch('/api/v1/analyze-intent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url
    }),
  })

  return res.json()
}

export const getDocument = async (url: string = testUrl) => {
  const res = await fetch('/api/v1/analyze_website', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url
    }),
  })

  return res.json()
}

export const getFileNames = async (site: string = 'fushionfund') => {
  const url = `https://dev06.se.tjcorp.qihoo.net/${site}`
  const res = await fetch(`/api/v1/files/by-url?url=${encodeURIComponent(url)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  return res.json()
}

export const getReport = async (id: string = 'finance_001') => {
  const res = await fetch(`/api/v1/report/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  return res.json()
}

export const getAudio = async (src: string) => {
  const res = await fetch(`/api/v1/audio/${src}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  })

  return res.blob()
}

export const getImage = async (src: string) => {
  const res = await fetch(`/api/v1/images/${src}`, {
    method: 'GET'
  })

  console.log('get Image', res);

  return res.blob()
}
// 向内容脚本发送消息
export const sendMessageToContent = (action, payload = {}) => {
  return new Promise((resolve, reject) => {
    // 监听内容脚本的响应
    const handler = (event) => {
      if (event.data.type === 'FROM_CONTENT') {
        window.removeEventListener('message', handler); // 移除监听
        if (event.data.error) {
          reject(event.data.error);
        } else {
          resolve(event.data.data);
        }
      }
    };
    window.addEventListener('message', handler);

    // 发送消息到内容脚本
    window.postMessage({ action, payload });
  });
}

