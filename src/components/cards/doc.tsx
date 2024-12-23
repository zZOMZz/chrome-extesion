interface DocCardProps {
    title: string
    showDoc: () => void
}

const DocCard: React.FC<DocCardProps> = ({ showDoc, title }) => {
    return (
        <div
            className="px-4 pt-3 pb-4 bg-white rounded-2xl mb-3 border border-[rgba(0,0,0,0.12)] relative transition-shadow duration-500
            cursor-pointer"
            onClick={() => { showDoc() }}
            style={{
                boxShadow:"rgba(0,0,0,0.04) 0px 6px 14px 0px"
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "rgba(0,0,0,0.063) 0px 12px 32px 0px"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "rgba(0,0,0,0.04) 0px 6px 14px 0px"; }}
        >
            <div className="card-title flex flex-row justify-between items-center mb-3">
                <div className="font-semibold text-[14px] leading-[20px] flex flex-row items-center ">
                    <div className="mr-1">
                        <img src="https://s0.ssl.qhres2.com/static/accea2db71b19ced.svg" alt="doc-icon" />
                    </div>
                    <span className="text-[13px] font-semibold text-[#4186FE] leading-5">研报</span>
                </div>
                <div className="card-title-icon flex flex-row gap-4">
                    <div className="hover:scale-105 cursor-pointer">
                        <img src="https://s3.ssl.qhres2.com/static/5bfbb4b20f84c8c1.svg" alt="download" />
                    </div>
                    <div className="hover:scale-105 cursor-pointer">
                        <img src="https://s3.ssl.qhres2.com/static/07232c1a163e452b.svg" alt="expand-card" />
                    </div>
                </div>
            </div>
            <div className="max-w-none overflow-auto relative">
                <img src="https://p4.ssl.qhimg.com/t110b9a93014fde31f54e612a92.png" alt="" className="-z-10 " />
                <div className="absolute top-0 h-full">
                    <div className="flex flex-row items-center pl-6 pt-5 gap-2">
                        <img src="https://s4.ssl.qhres2.com/static/bf26c90d73dde2d3.svg" alt="" />
                        <div className="">智研通</div>
                    </div>
                    <div className="mt-5 mb-5 text-[26px] font-semibold leading-9 mx-6">{ title }</div>
                    <div className="mx-6 text-[#888D93] font-normal absolute bottom-[17px]">*报告由AI生成</div>
                </div>
            </div>
        </div>
    )
}

export default DocCard