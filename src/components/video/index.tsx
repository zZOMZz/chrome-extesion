import React, { useEffect, useRef, useState } from 'react';
// import PlayIcon from '/icons/play.svg';
// import SoundIcon from '/icons/sound.svg';

type VideoPlayerProps = {
  src: string; // 视频源链接
  poster: string; // 视频封面
  title?: string; // 视频标题
  onClose: () => void; // 关闭视频播放组件的回调
};

const PlayIcon = () => {
  return (
    <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%" className='h-10 w-10 bg-transparent'><use className="ytp-svg-shadow" xlinkHref="#ytp-id-81"></use><path className="fill-white" d="M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z" id="ytp-id-81"></path></svg>
  )
}

const SoundIcon = () => {
  return (
    <svg height="100%" version="1.1" viewBox="0 0 36 36" width="100%" className='w-10 h-10 bg-transparent'><use className="ytp-svg-shadow" xlinkHref="#ytp-id-15"></use><use className="ytp-svg-shadow" xlinkHref="#ytp-id-16"></use><defs><clipPath id="ytp-svg-volume-animation-mask"><path d="m 14.35,-0.14 -5.86,5.86 20.73,20.78 5.86,-5.91 z"></path><path d="M 7.07,6.87 -1.11,15.33 19.61,36.11 27.80,27.60 z"></path><path className="ytp-svg-volume-animation-mover" d="M 9.09,5.20 6.47,7.88 26.82,28.77 29.66,25.99 z" transform="translate(0, 0)"></path></clipPath><clipPath id="ytp-svg-volume-animation-slash-mask"><path className="ytp-svg-volume-animation-mover" d="m -11.45,-15.55 -4.44,4.51 20.45,20.94 4.55,-4.66 z" transform="translate(0, 0)"></path></clipPath></defs><path className="ytp-svg-fill ytp-svg-volume-animation-speaker" clipPath="url(#ytp-svg-volume-animation-mask)" d="M8,21 L12,21 L17,26 L17,10 L12,15 L8,15 L8,21 Z M19,14 L19,22 C20.48,21.32 21.5,19.77 21.5,18 C21.5,16.26 20.48,14.74 19,14 ZM19,11.29 C21.89,12.15 24,14.83 24,18 C24,21.17 21.89,23.85 19,24.71 L19,26.77 C23.01,25.86 26,22.28 26,18 C26,13.72 23.01,10.14 19,9.23 L19,11.29 Z" fill="#fff" id="ytp-id-15"></path><path className="ytp-svg-fill ytp-svg-volume-animation-hider" clipPath="url(#ytp-svg-volume-animation-slash-mask)" d="M 9.25,9 7.98,10.27 24.71,27 l 1.27,-1.27 Z" fill="#fff" id="ytp-id-16"></path></svg>
  )
}

const FullscreenIcon = () => {
  return (
    <svg
      height="100%"
      version="1.1"
      viewBox="0 0 36 36"
      width="100%"
      className='w-10 h-10 bg-transparent transition-transform duration-300 group'
    >
      <g className="ytp-fullscreen-button-corner-0">
        <use className="ytp-svg-shadow" xlinkHref="#ytp-id-7"></use>
        <path className="fill-white transform origin-center transition-transform duration-300 group-hover:-translate-x-[2px] group-hover:-translate-y-[2px]" d="m 10,16 2,0 0,-4 4,0 0,-2 L 10,10 l 0,6 0,0 z" id="ytp-id-7"></path>
      </g>
      <g className="ytp-fullscreen-button-corner-1 fill-white">
        <use className="ytp-svg-shadow" xlinkHref="#ytp-id-8"></use>
        <path className="fill-white transform origin-center transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]" d="m 20,10 0,2 4,0 0,4 2,0 L 26,10 l -6,0 0,0 z" id="ytp-id-8"></path>
      </g>
      <g className="ytp-fullscreen-button-corner-2 fill-white">
        <use className="ytp-svg-shadow" xlinkHref="#ytp-id-9">
        </use>
        <path className="fill-white transform origin-center transition-transform duration-300 group-hover:translate-x-[2px] group-hover:translate-y-[2px]" d="m 24,24 -4,0 0,2 L 26,26 l 0,-6 -2,0 0,4 0,0 z" id="ytp-id-9"></path>
      </g>
      <g className="ytp-fullscreen-button-corner-3 fill-white">
        <use className="ytp-svg-shadow" xlinkHref="#ytp-id-10"></use>
        <path className="fill-white transform origin-center transition-transform duration-300 group-hover:-translate-x-[2px] group-hover:translate-y-[2px]" d="M 12,20 10,20 10,26 l 6,0 0,-2 -4,0 0,-4 0,0 z" id="ytp-id-10"></path>
      </g>
    </svg>
  )
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster, title, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(false);

  const handlePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newTime = (parseFloat(event.target.value) / 100) * videoRef.current.duration;
      videoRef.current.currentTime = newTime;
      setProgress(parseFloat(event.target.value));
    }
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (videoRef.current) {
      const newVolume = parseFloat(event.target.value);
      videoRef.current.volume = newVolume;
      setVolume(newVolume);
    }
  };

  const handleFullscreen = () => {
    if (!videoRef.current) return;
    setIsFullscreen(!isFullscreen);
    if (isFullscreen) {
      document.exitFullscreen?.();
    } else {
      videoRef.current.requestFullscreen?.();
    }
  };

  useEffect(() => {
    document.addEventListener('fullscreenchange', () => {
      console.log('fullscreenchange');
      console.log('document.fullscreenElement', document.fullscreenElement);
      setIsFullscreen(!!document.fullscreenElement);
    })
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="video-player flex flex-col items-center space-y-4 rounded-lg  relative z-[999]  bg-black w-3/5 h-2/3"
        onMouseEnter={() => { setIsControlsVisible(true) }}
        onMouseLeave={() => { setIsControlsVisible(false) }}
      >
        {title && <h2 className="text-lg font-bold text-black">{title}</h2>}
        <div className="video-container relative w-full h-full">
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            className="video w-full h-full rounded shadow-lg"
            onTimeUpdate={handleTimeUpdate}
          />
          {
            isControlsVisible && (
              <div className="controls flex flex-col space-y-2 mt-2 absolute bottom-2 w-full">
                <input
                  type="range"
                  className="progress-bar w-full cursor-pointer"
                  value={progress}
                  onChange={handleSeek}
                />
                <div className='flex flex-row'>
                  <button
                    className="play-pause text-white roundedinline-block p-0 bg-transparent"
                    onClick={handlePlayPause}
                  >
                    <PlayIcon />
                  </button>
                  <div
                    className="items-center space-x-4 relative flex-row flex "
                    onMouseLeave={() => {
                      setIsVolumeVisible(false)
                    }}
                  >
                    <button
                      className='p-0 bg-transparent'
                      onMouseEnter={() => {
                        setIsVolumeVisible(true)
                      }}
                    >
                      <SoundIcon />
                    </button>
                    <div className={`relative right-4 top-[1px] ${isVolumeVisible ? 'w-20 opacity-100' : 'w-0 opacity-0'} transform transition-all duration-300`}>
                      <input
                        type="range"
                        className={`volume-bar cursor-pointer w-full`}
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
                      />
                    </div>
                  </div>
                  <button
                    className="fullscreen p-0 bg-transparent rounded hover:bg-gray-600 absolute right-0"
                    onClick={() => {
                      console.log('fullscreen');
                      handleFullscreen();
                    }}
                  >
                    <FullscreenIcon />
                  </button>
                </div>
              </div>
            )
         }
        </div>
      </div>
      <div className='mask h-full w-full bg-black opacity-50 absolute z-[998]' onClick={() => { onClose()}}></div>
    </div>
  );
};

export default VideoPlayer;
