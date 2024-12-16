import React, { useRef, useState, useEffect } from "react";

interface AudioCardProps {
    src: string;
    title: string
}

const AudioCard: React.FC<AudioCardProps> = ({ src, title }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isSetVolume, setIsSetVolume] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.volume = volume;
        }
    }, [volume]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;
        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (audio) {
            audio.currentTime = Number(e.target.value);
            setCurrentTime(audio.currentTime);
        }
    };

    const adjustTime = (amount: number) => {
        const audio = audioRef.current;
        if (audio) {
            audio.currentTime = Math.min(
                Math.max(audio.currentTime + amount, 0),
                duration
            );
            setCurrentTime(audio.currentTime);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVolume(Number(e.target.value));
    };

    return (
        <div className="p-3 bg-white rounded-2xl mb-3 flex flex-col border border-[rgba(0,0,0,0.12)]">
            <audio
                ref={audioRef}
                src={src}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
            />
            <div className="card-title flex flex-row justify-between items-center mb-3">
                <div className="font-semibold text-[14px] leading-[20px] flex flex-row items-center">
                    <div className="mr-1">
                        <img src="https://s3.ssl.qhres2.com/static/84c387df226655a5.svg" alt="audio-icon" />
                    </div>
                    <span>音频研报</span>
                </div>
                <div className="card-title-icon hover:scale-105 cursor-pointer">
                    <img src="https://s3.ssl.qhres2.com/static/5bfbb4b20f84c8c1.svg" alt="download" />
                </div>
            </div>
            <div className="flex items-center justify-center font-semibold text-[16px] leading-6">
                <span>{ title }</span>
            </div>
            {/* Progress Bar */}
            <div className="mt-4">
                <div className="flex justify-between text-sm text-gray-600">
                    <span className="text-[12px] font-normal leading-[18px]">{formatTime(currentTime)}</span>
                    <input
                        type="range"
                        min="0"
                        max={duration}
                        value={currentTime}
                        onChange={handleSeek}
                       className={`w-full relative h-[6px] top-[6px] mx-3 appearance-none rounded-lg bg-[rgba(0,0,0,0.12)] 
                            [&::-webkit-slider-thumb]:appearance-none 
                            [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-0
                            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#202224]
                            [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 
                            [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#202224]
                            [&::-ms-thumb]:h-4 [&::-ms-thumb]:w-4 
                            [&::-ms-thumb]:rounded-full [&::-ms-thumb]:bg-[#202224]`}
                            style={{
                                '--tw-progress': `${(currentTime / duration) * 100}%`,
                                background: `linear-gradient(to right, #202224 0%, #202224 var(--tw-progress), rgba(0, 0, 0, 0.12) var(--tw-progress), rgba(0, 0, 0, 0.12) 100%)`,
                            } as React.CSSProperties}
                    />
                    <span className="text-[12px] font-normal leading-[18px]">{formatTime(duration)}</span>
                </div>
            </div>

            <div className="flex items-center space-x-4 justify-center mt-3 relative">
                {/* Backward 5s Button */}
                <div
                    onClick={() => adjustTime(-5)}
                    className="cursor-pointer hover:scale-105"
                >
                    <img src="https://s1.ssl.qhres2.com/static/d1f5f32ae04fd170.svg" alt="back-5" />
                </div>

                {/* Play/Pause Button */}
                <div
                    onClick={togglePlay}
                    className="w-12 h-12 rounded-full flex items-center justify-center bg-[#E8F6FF] cursor-pointer hover:scale-105"
                >
                    {isPlaying ? <img src="https://s0.ssl.qhres2.com/static/10c2b1920e9672fe.svg" alt="pause-icon" className="w-8" /> : <img src="https://s4.ssl.qhres2.com/static/f59e497a3b92281d.svg" alt="start-icon" />}
                </div>

                {/* Forward 5s Button */}
                <div
                    onClick={() => adjustTime(5)}
                    className="cursor-pointer hover:scale-105 relative"
                >
                    <img src="https://s3.ssl.qhres2.com/static/5f49479b2733adcb.svg" alt="5" className="absolute" />
                    <img src="https://s1.ssl.qhres2.com/static/16ffc7fac323339d.svg" alt="frame-go" />
                </div>

                {/* Volume Button */}
                <div
                    className="flex items-center justify-center absolute right-6"
                    onMouseLeave={() => {
                        setIsSetVolume(false);
                    }}
                >
                    <div
                        onMouseEnter={() => setIsSetVolume(true)}
                    >
                        <img src="https://s3.ssl.qhres2.com/static/45ff3faa5e5e8dee.svg" alt="volume" />
                    </div>
                    <div
                        className={`${isSetVolume ? " opacity-100 w-[100px]" : "opacity-0 w-0"} transition-all duration-300 absolute bottom-14 transform -rotate-90 origin-center`}
                        onMouseEnter={() => setIsSetVolume(true)}
                        onMouseLeave={() => setIsSetVolume(false)}
                    >
                        <input
                            id="volume"
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={volume}
                            onChange={handleVolumeChange}
                            className={`w-full relative bottom-[4px] h-[6px] appearance-none rounded-lg bg-[rgba(0,0,0,0.12)] 
                            [&::-webkit-slider-thumb]:appearance-none 
                            [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3
                            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#202224]
                            [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 
                            [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#202224]
                            [&::-ms-thumb]:h-4 [&::-ms-thumb]:w-4 
                            [&::-ms-thumb]:rounded-full [&::-ms-thumb]:bg-[#202224]`}
                            style={{
                                '--tw-progress': `${volume * 100}%`,
                                background: `linear-gradient(to right, #202224 0%, #202224 var(--tw-progress), rgba(0, 0, 0, 0.12) var(--tw-progress), rgba(0, 0, 0, 0.12) 100%)`,
                            } as React.CSSProperties}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

// 格式化时间为 mm:ss
const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
};

export default AudioCard;
