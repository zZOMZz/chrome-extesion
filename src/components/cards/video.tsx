interface VideoCardProps {
    showVideo: () => void
    videoCover: string
    title: string
    videoTime: string
}
const VideoCard: React.FC<VideoCardProps> = ({ showVideo, videoCover, title , videoTime}) => {

    return (
        <div
            className="px-4 py-3 bg-white rounded-2xl mb-3 flex flex-col border border-[rgba(0,0,0,0.12)]"
            style={{
                boxShadow: "rgba(0,0,0,0.04) 0px 6px 14px 0px"
            }}
        >
            <div className="card-title flex flex-row justify-between items-center mb-3">
                <div className="font-semibold text-[14px] leading-[20px] flex flex-row items-center">
                    <div className="mr-1">
                        <img src="https://s4.ssl.qhres2.com/static/bbd8d43783673e16.svg" alt="video-icon" />
                    </div>
                    <span className="text-[13px] font-semibold text-[#4D52FF] leading-5">视频速览</span>
                </div>
                <div className="card-title-icon">
                    <div className="hover:scale-105 cursor-pointer">
                        <img src="https://s3.ssl.qhres2.com/static/5bfbb4b20f84c8c1.svg" alt="download" />
                    </div>
                </div>
            </div>
            <div
                className="relative mb-2 cursor-pointer"
                onClick={() => { showVideo() }}
            >
                <img src={videoCover} alt="" className="rounded-2xl hover:shadow-lg w-[420px] h-[234px] object-cover" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[rgba(0,0,0,0.60)] w-10 h-10 rounded-full">
                    <img src="https://s2.ssl.qhres2.com/static/7940691fdfefac9a.svg" alt="play" className="relative top-[10px] left-[10px] " />
                </div>
                <div
                    className="absolute bottom-0 flex flex-col w-full h-[90px] rounded-bl-2xl rounded-br-2xl"
                    style={{
                        background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.00) 0%, rgba(0, 0, 0, 0.80) 100%)'
                    }}
                >
                    <div
                        className="pt-5 px-4 overflow-hidden text-white text-[16px] font-semibold leading-6 text-ellipsis whitespace-nowrap"
                    >
                        {title}
                    </div>
                    <div className=" text-[12px] font-semibold leading-[18px] inline-block mt-2 ml-4">
                        <span className="py-[1px] px-[6px] rounded-lg bg-[rgba(0,0,0,0.60)] text-white">{ videoTime }</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VideoCard