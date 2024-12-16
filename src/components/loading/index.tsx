
interface LoadingProps {
  siteType: string;
  isReading: boolean;
}

const Loading: React.FC<LoadingProps> = ({ siteType, isReading }) => {
 
    return (
      <div className="p-4 bg-white rounded-xl flex flex-col">
        <div className="flex flex-col">
          <div className="flex flex-row items-center gap-3">
            <div className="w-4 h-4 flex items-center justify-center">
              <img src="https://s4.ssl.qhres2.com/static/e0ce72e78ce584fe.svg" alt="Ellipse-1" />
            </div>
            <div className="text-[#202224] text-[14px] font-normal">分析网页类型</div>
          </div>
          <div className={`flex flex-row mt-1 ${siteType ? 'opacity-100 translate-y-0' : 'opacity-0 h-0'} -translate-y-full transform transition-all duration-300 overflow-hidden`}>
            <div className="flex w-4 justify-center mr-6">
              <img src="https://s4.ssl.qhres2.com/static/cbe0b83aed59a14f.svg" alt="vetor" />
            </div>
            <div className="text-[13px] text-[#505355] leading-6">{ siteType }</div>
          </div>
        </div>
        <div className={`flex flex-col mt-1 ${isReading ? 'opacity-100' : 'opacity-0 h-0'}  transform transition-all duration-500 overflow-hidden`}>
          <div className="flex flex-row items-center gap-3">
            <div className="w-4 h-4 flex items-center justify-center animate-spin">
              <img src="https://s5.ssl.qhres2.com/static/53995333671b6ca9.svg" alt="Ellipse-2" />
            </div>
            <div className="text-[#202224]">阅读网页</div>
          </div>
          <div className="flex flex-row mt-1">
            <div className="flex w-4 justify-center h-12 mr-6">
              <img src="https://s4.ssl.qhres2.com/static/a1bcb8e99c0d9da8.svg" alt="vetor-long" />
            </div>
            <div className="text-[#505355] text-[13px] flex flex-col leading-6">
              <div>识别网页结构</div>
              <div>分析234个网页</div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default Loading