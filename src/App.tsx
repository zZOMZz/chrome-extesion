import Drawer from "./components/drawer"
import FloatingBall from "./components/floatingBall"
import VideoPlayer from "./components/video"
import DocMarkdown from "./components/doc"
import { useState } from "react"
// import { sendMessageToBackground } from "./content-script/content.js"
// const { sendMessageToBackground } = require('./content-script/content.js');

declare global {
  interface Window {
    sendMessageToBackground: (message: string, data: any) => Promise<any>;
  }
}
// const sendMessageToBackground = window.sendMessageToBackground;

// const filePath = "/video/videoplayback.mp4";
// const filePath = "/video/fusion_fund_guodegang.mp4";
// const filePath = "/video/output.mp4";

// const filePath = "/api/v1/video/sample-10s.mp4"
const posterPath = "";
// const markdownUrl = "/markdown/1.md";
// const markdownUrl = "/markdown/2.md"
// const markdownUrl = "/api/v1/report/finance_001"

const videoSrc_1 = document.querySelector("#shadow-host")?.getAttribute("data-video-src-1") as string;
const videoSrc_2 = document.querySelector("#shadow-host")?.getAttribute("data-video-src-2") as string;
const videoSrc_3 = document.querySelector("#shadow-host")?.getAttribute("data-video-src-3") as string;

const getVideoSrc = (url: string) => {
  switch (url) {
    case 'https://www.fusionfund.com/':
      return videoSrc_1
    case 'https://finance.sina.com.cn/china/':
      return videoSrc_3
    case 'https://s.taobao.com/search?commend=all&ie=utf8&initiative_id=tbindexz_20170306&page=1&q=%E7%AC%94%E8%AE%B0%E6%9C%AC&search_type=item&sourceId=tb.index&spm=a21bo.jianhua%2Fa.201856.d13&ssid=s5-e&tab=all':
      return videoSrc_2
    default:
      return videoSrc_1
  }
}

function App() {
  const [isOpen, setIsOpen] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const [showDoc, setShowDoc] = useState(false)
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [videoUrl, setVideoUrl] = useState<string>("");
  console.log('videoUrl', videoUrl);

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  const handleVideoUrl = (url: string) => {
    setVideoUrl(url)
  }

  const handleVideo = () => {
    setShowVideo(!showVideo)
  }

  const handleDoc = () => {
    setShowDoc(!showDoc)
  }

  const changeMarkdownContent = (content: string) => {
    setMarkdownContent(content)
  }
  const url = window.location.href
  const videoSrc = getVideoSrc(url)
  
  return (
    <div className={`fixed top-0 right-0  h-full z-[999] ${isOpen ? 'visible pointer-events-auto' : 'pointer-events-none'}`}>
      {showVideo && <VideoPlayer src={videoSrc} poster={posterPath} onClose={() => { setShowVideo(false) }} />}
      {showDoc && <DocMarkdown onClose={() => { setShowDoc(false) }} content={markdownContent} />}
      <div className="pointer-events-auto">
        <FloatingBall onClick={handleOpen} />
      </div>
      <Drawer isOpen={isOpen} showVideo={handleVideo} showDoc={handleDoc} setVideo={handleVideoUrl} changeMarkdownContent={changeMarkdownContent} />
    </div>
  )
}

export default App
