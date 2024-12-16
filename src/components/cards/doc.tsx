import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface DocCardProps {
    content: string
    showDoc: () => void
}

const DocCard: React.FC<DocCardProps> = ({ content, showDoc }) => {
    return (
        <div
            className="px-4 py-3 bg-white rounded-2xl mb-3 border border-[rgba(0,0,0,0.12)] relative transition-shadow duration-500
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
                    <span>研报</span>
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
            <div className="prose max-w-none px-3 pb-2 overflow-auto max-h-[250px]">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>
            <div
                className="absolute bottom-0 z-20 h-24 w-full transition-colors left-0 rounded-2xl"
                style={{
                    background: "linear-gradient(rgba(255, 255, 255, 0), rgb(255, 255, 255))"
                }}
            >
            </div>
        </div>
    )
}

export default DocCard