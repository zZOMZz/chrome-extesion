import {  useState } from "react"
import DocCard from "../cards/doc"
import AudioCard from "../cards/audio"
import VideoCard from "../cards/video"
import LoadingCard from '../loading'
import { sendMessageToContent } from '../../api/api'
// import { sendMessageToBackground } from '../../content-script/content.js'


interface DrawerProps {
    isOpen: boolean,
    showVideo: () => void
    showDoc: () => void
    setVideo: (url: string) => void
    changeMarkdownContent: (content: string) => void
}

interface FinishedHeaderProps {
    selectOptions: string[]
}

const FinishedHeader: React.FC<FinishedHeaderProps> = ({ selectOptions }) => {

    const [isChose, setIsChose] = useState(false)
    const [selectedOption, setSelectedOption] = useState<string>(selectOptions[0])

    return (
        <div className="bg-white rounded-2xl flex flex-row py-3 px-4 items-center justify-between">
            <div className="flex flex-row items-center">
                <div className="finished-icon mr-2">
                    <img src="https://s5.ssl.qhres2.com/static/085db76734a35d07.svg" alt="abstract" className="" />
                </div>
                <div className="font-normal text-[14px] leading-[20px]">已生成报告</div>
                <div
                    className={`mr-4 cursor-pointer flex items-center ml-3 px-2 py-[3px] border border-black/10 rounded-lg relative ${isChose ? 'bg-[rgba(0,40,120,0.12)]' : 'bg-white'} select-none`}
                    onClick={() => setIsChose(!isChose)}
                >
                    <img src="https://s0.ssl.qhres2.com/static/e56e8b1abb456ce9.svg" alt="Set" className="w-3 h-3" />
                    <div className="text-[12px] font-normal ml-1">社区</div>
                    { 
                        isChose && (
                            <div className="p-4 rounded-lg w-[286px] h-[188px] absolute top-[25px] left-0 shadow-custom-shadow flex flex-col gap-4 bg-white z-50">
                                <div className="flex flex-row">
                                    <div className="flex items-center mr-1">
                                        <img src="https://s5.ssl.qhres2.com/static/1db102e9f2bc29f9.svg" alt="union" />
                                    </div>
                                    <div className="text-[13px]">已自动识别网站类型，您也可以选择类型</div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {
                                        selectOptions.map((option, index) => {
                                            return (
                                                <div key={index} className={`cursor-pointer text-[14px] text-[#202224] h-8 flex items-center px-3 border border-black/10 rounded-xl ${selectedOption === option ? 'bg-[#202224] text-white' : ''}`} onClick={() => { setSelectedOption(option)}}>{option}</div>
                                            )
                                        })
                                    }
                                </div>
                                <div className="flex flex-row gap-1 justify-end text-[14px]">
                                    <div className="h-8 bg-[rgba(0,40,120,0.06)] py-[5px] px-4 flex items-center rounded-xl" onClick={() => { setIsChose(false) }}>取消</div>
                                    <div className="h-8 bg-[#006BFB] py-[5px] px-4 text-white rounded-xl flex items-center" onClick={() => { setIsChose(false) }}>重新生成</div>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="icons flex flex-row">
                <div className="cursor-pointer hover:scale-105">
                    <img src="https://s5.ssl.qhres2.com/static/18e9e31473463624.svg" alt="check-down" />
                </div>
            </div>
        </div>
    )
}

const LoadingHeader: React.FC = () => {
    return (
        <div className="bg-white rounded-2xl flex flex-row py-[10px] px-4 items-center ">
            <div className="flex items-center justify-center mr-2">
                <img src="https://s0.ssl.qhres2.com/static/618026afcd333ac0.svg" alt="abstract" />
            </div>
            <div className="text-[14px] leading-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 animate-text-gradient">正在阅读网页...</div>
            <div className="icons">
                <div></div>
            </div>
        </div>
    )
}

const returnUrl = (url: string) => {
    switch (url) {
        case 'https://www.fusionfund.com/portfolio':
            return 'fusionfund'
        case 'https://finance.sina.com.cn/china/':
            return 'sina'
        case 'https://s.taobao.com/search?commend=all&ie=utf8&initiative_id=tbindexz_20170306&page=1&q=%E7%AC%94%E8%AE%B0%E6%9C%AC&search_type=item&sourceId=tb.index&spm=a21bo.jianhua%2Fa.201856.d13&ssid=s5-e&tab=all':
            return 'taobao'
    }
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, showVideo, showDoc, setVideo, changeMarkdownContent }) => {

    const [audioSrc, setAudioSrc] = useState<string>("")
    
    const [isLoaded, setIsLoaded] = useState(false)
    const [hasStarted, setHasStarted] = useState(false)

    const [siteType, setSiteType] = useState<string>("")
    const [isReading, setIsReading] = useState(false)
    const [videoCover, setVideoCover] = useState<string>("")
    const [title, setTitle] = useState<string>("")
    
    const options: string[] = ["金融风投", "电子商务", "资讯", "娱乐", "社区", "生活分享"]
   
    const handleStart = () => {
        setHasStarted(true)
        getData()
    }

    const getData = async () => {
        const url = location.href
        const res_SiteType: any = await sendMessageToContent('getSiteType', { url })

        setSiteType(res_SiteType.website_type)

        setTimeout(() => {
            setIsReading(true)

            setTimeout(() => {
                setIsLoaded(true)
                getName()
            }, 48000)
        }, 2000)
    }

    const getName = async () => {
        // const res = await getFileNames()
        const url = location.href
        const site = returnUrl(url)
        const res: any = await sendMessageToContent('getFileNames', { site })
        console.log('getName res [drawer.tsx]', res);

        setVideo(res.video)
        setTitle(res.title)
        // const imageRes = await getImage(res.image)
        setVideoCover(res.image)

        // const { data } = await getReport(res.file)
        const markdownRes: any = await sendMessageToContent('getReport', { id: res.file })
        console.log('markdownRes data', markdownRes.data);
        changeMarkdownContent(markdownRes.data.content)

        // const audioRes = await getAudio(res.audio)
        setAudioSrc(res.audio)

        console.log('getName res', res);
    }

    const handleChnageVoice = (voice: string) => {
        switch (voice) {
            case "标准男声":
                setAudioSrc("man.mp3")
                break
            case "标准女声":
                setAudioSrc("woman.mp3")
                break
            case "郭德纲":
                setAudioSrc("guodegang.mp3")
                break
        }
    }

    return (
        <div id="drawer" className={`h-full w-[472px] overflow-auto bg-sunken transform ${isOpen ? "translate-x-0 visible" : "invisible translate-x-full pointer-events-none"} transition-transform duration-300 rounded-tl-2xl rounded-bl-2xl shadow-custom-drawer  relative`}>
            <div className="absolute top-0 right-0 -z-10">
                <img src="https://p0.ssl.qhimg.com/t110b9a9301863cbc0ec7dec7e0.png" alt="background-linear" />
            </div>
            <div className="flex items-center justify-between mb-3 leading-[14px] px-5 pt-5 pb-3">
                <div className="flex flex-row items-center gap-2">
                    <img src="https://s1.ssl.qhres2.com/static/4c6346ad9fada294.svg" alt="brand" className="h-8 w-8 object-contain"  width={25}/>
                    <span className="text-[#202224] text-[14px] font-semibold leading-[22px]">智研通</span>
                </div>
                <div className="flex">
                    <div className="w-8 h-8 flex items-center justify-center cursor-pointer hover:scale-105">
                        <img src='https://s4.ssl.qhres2.com/static/c988e2b3061e51c9.svg' alt="question" className="w-4 h-4 inline-block" />
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center cursor-pointer hover:scale-105">
                        <img src='https://s4.ssl.qhres2.com/static/20bc1d2427f408d7.svg' alt="pin" className="w-4 h-4 inline-block" />
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center cursor-pointer hover:scale-105">
                        <img src='https://s1.ssl.qhres2.com/static/63ebb04c6502137d.svg' alt="notification" className="w-4 h-4 inline-block" />
                    </div>
                </div>
            </div>
            {
                hasStarted ? (
                    <div className="px-3">
                        <div className="mb-2">
                            {
                                isLoaded ? <FinishedHeader selectOptions={options} /> : <LoadingHeader />
                            }
                        </div>
                        <div className={`mb-4 overflow-hidden ${isLoaded ? 'opacity-0 -translate-y-full h-0' : 'opacity-100'} transform transition-all`}>
                            <LoadingCard siteType={siteType} isReading={isReading} />
                        </div>
                        <div className={`flex flex-col gap-4 ${ isLoaded ? 'opacity-100' : 'opacity-0' } transition-all`}>
                            <DocCard title={title} showDoc={showDoc} />
                            <VideoCard showVideo={showVideo} videoCover={`https://dev06.se.tjcorp.qihoo.net:8000/v1/images/${videoCover}`} title={title} videoTime="4:53" />
                            <AudioCard src={`https://dev06.se.tjcorp.qihoo.net:8000/v1/audio/${audioSrc}`} title={title} handleChnageVoice={handleChnageVoice} />
                        </div>
                    </div>
                ) : (
                        <div className="flex flex-col justify-center gap-[96px]">
                            <div className="flex px-9 mt-10 flex-col justify-center items-center relative">
                                <img src="https://s4.ssl.qhres2.com/static/be78caf6983831e9.svg" alt="union-large" className="absolute top-0 right-16 " />
                                <img src="https://s3.ssl.qhres2.com/static/dd1fe6603811c68b.svg" alt="union-middle" className="absolute top-8 left-20" />
                                <img src="https://s1.ssl.qhres2.com/static/70155cb6ef2f75c0.svg" alt="union-small" className="absolute right-[108px] -top-7" />
                                <div className="text-center text-[#202224] text-[28px] font-medium leading-9 mb-[9px] mt-14">用智研通，一“点”就通！</div>
                                <div className="text-[#505355] text-center text-[14px] leading-[22px] mb-6">快速生成专业报告，并智能转化为视频或播客，多场景满足您的内容创作和分享需求，省时高效，简单易用！</div>
                                <div
                                    className="w-40 h-10 px-3 py-[7px] rounded-xl flex items-center justify-center text-white cursor-pointer hover:scale-105 text-[16px] font-semibold"
                                    style={{
                                        background: 'linear-gradient(270deg, #5919FF 0%, #006BFB 100%)'
                                    }}
                                    onClick={() => { handleStart() }}
                                >
                                    识别当前网站
                                </div>
                            </div>
                            <div className="flex flex-col items-center justify-center gap-8">
                                <div className="flex flex-row items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                        <img src="https://s2.ssl.qhres2.com/static/4a1e244937552392.svg" alt="" className="w-4 h-4"/>
                                    </div>
                                    <div className="flex flex-col w-[196px] gap-1">
                                        <div className="text-[#202224] text-[16px] font-semibold leading-6">通览网站，生成研究报告</div>
                                        <div className="text-[#888D93] text-[13px] font-normal leading-5">快速扫描整站内容，智能提取关键信息，帮助您生成结构清晰、重点突出的研究报告，节省时间，提高效率。</div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                        <img src="https://s0.ssl.qhres2.com/static/b5f2bc677e10f4e6.svg" alt="" />
                                    </div>
                                    <div className="flex flex-col w-[196px] gap-1">
                                        <div className="text-[#202224] text-[16px] font-semibold leading-6">将报告生成视频</div>
                                        <div className="text-[#888D93] text-[13px] font-normal leading-5">将文字报告转换为动态视频，通过可视化方式呈现分析结果，让复杂信息更加直观易懂。</div>
                                    </div>
                                </div>
                                <div className="flex flex-row items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                                        <img src="https://s4.ssl.qhres2.com/static/5b18a7fd742974e1.svg" alt="" />
                                    </div>
                                    <div className="flex flex-col w-[196px] gap-1">
                                        <div className="text-[#202224] text-[16px] font-semibold leading-6">生成播客，报告讲给你听</div>
                                        <div className="text-[#888D93] text-[13px] font-normal leading-5">将报告内容生成音频播客，支持随时随地收听，为您提供更便捷的信息获取方式。</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                )
            }
        </div>
    )
}

export default Drawer