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
  // http://dev06.se.tjcorp.qihoo.net:8000/v1/video/${videoUrl}
  const root = document.getElementById("react-drawer-root");
  console.log('root', root);
  const videoSrc = document.querySelector("#shadow-host")?.getAttribute("data-video-src") as string;
  console.log('[App.tsx] videoSrc', videoSrc);
  return (
    <div className="fixed top-0 right-0  h-full z-[999]">
      {showVideo && <VideoPlayer src={videoSrc} poster={posterPath} onClose={() => { setShowVideo(false) }} />}
      {showDoc && <DocMarkdown onClose={() => { setShowDoc(false) }} content={markdownContent} />}
      
      <FloatingBall onClick={()  => { handleOpen() }} />
      <Drawer isOpen={isOpen} showVideo={handleVideo} showDoc={handleDoc} setVideo={handleVideoUrl} changeMarkdownContent={changeMarkdownContent} />
    </div>
  )
}

export default App
