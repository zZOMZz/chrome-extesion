import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface DocMarkdownProps {
  onClose: () => void
  content: string
}

const DocMarkdown: React.FC<DocMarkdownProps> = ({ onClose, content }) => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="w-[800px] h-[850px] z-[999] bg-white rounded-xl py-5 px-6">
          <div className="markdown-title flex justify-between flex-row mb-9 items-center">
            <div className="flex flex-row items-center gap-2">
              <img src="https://s1.ssl.qhres2.com/static/4c6346ad9fada294.svg" alt="brand" className="h-8 w-8 object-contain" width={25} />
              <span className="text-[#202224] text-[14px] font-semibold leading-[22px]">智研通</span>
            </div>
            <div className="text-[#B0B4B8] text-[13px] font-normal leading-5">内容由AI生成，仅供参考</div>
          </div>
          <div className="flex justify-center overflow-auto">
            <div className="prose max-w-none  overflow-auto flex flex-col justify-center w-[640px] max-h-[750px]">
              <ReactMarkdown remarkPlugins={[remarkGfm]} className='overflow-auto'>{content}</ReactMarkdown>
            </div>
          </div>
        </div>
        <div className='mask h-full w-full bg-black opacity-50 absolute z-[998]' onClick={() => { onClose() }}></div>
      </div>
    )
}

export default DocMarkdown