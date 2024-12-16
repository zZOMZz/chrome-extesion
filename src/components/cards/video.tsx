import { useState } from "react"

interface VideoCardProps {
    showVideo: () => void
    videoCover: string
    title: string
}
const VideoCard: React.FC<VideoCardProps> = ({ showVideo, videoCover, title }) => {
    const [hoverVideo, setHoverVideo] = useState(false)

    return (
        <div className="px-4 py-3 bg-white rounded-2xl mb-3 flex flex-col border border-[rgba(0,0,0,0.12)]">
            <div className="card-title flex flex-row justify-between items-center mb-3">
                <div className="font-semibold text-[14px] leading-[20px] flex flex-row items-center">
                    <div className="mr-1">
                        <img src="https://s4.ssl.qhres2.com/static/bbd8d43783673e16.svg" alt="video-icon" />
                    </div>
                    <span>视频研报</span>
                </div>
                <div className="card-title-icon">
                    <div className="hover:scale-105 cursor-pointer">
                        <img src="https://s3.ssl.qhres2.com/static/5bfbb4b20f84c8c1.svg" alt="download" />
                    </div>
                </div>
            </div>
            <div
                className="relative mb-2"
                onMouseEnter={() => { setHoverVideo(true) }}
                onMouseLeave={() => { setHoverVideo(false) }}
                onClick={() => { showVideo() }}
            >
                <img src={videoCover} alt="" className="rounded-2xl hover:shadow-lg hover:rounded-none w-[420px] h-[234px] object-cover" />
                {
                    hoverVideo && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[rgba(0,0,0,0.60)] w-10 h-10 rounded-full">
                            <img src="https://s2.ssl.qhres2.com/static/7940691fdfefac9a.svg" alt="play" className="relative top-[10px] left-[10px] " />
                        </div>
                    )
                }
            </div>
            <div className="text-[#202224] text-[15px] font-normal leading-[22px]">
                <span>{ title }</span>
            </div>
        </div>
    )
}

export default VideoCard