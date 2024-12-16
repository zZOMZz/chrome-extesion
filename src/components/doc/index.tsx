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
          <div className="markdown-title flex justify-between">
            <div className=""></div>
            <div>内容由AI生成，仅供参考</div>
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