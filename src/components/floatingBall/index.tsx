import FloatingIcon from '../../assets/floating.svg'

interface FloatingBallProps {
    onClick?: () => void
}

const FloatingBall: React.FC<FloatingBallProps> = ({ onClick }) => {
    return (
        <div className="fixed w-[88px] z-50 cursor-pointer bg-red-400 top-10 right-[-48px]  shadow-[0_5px_25px_rgba(0,0,0,0.1),0_3.2px_12px_rgba(0,0,0,0.08)] rounded-[24px_0_0_24px] hover:bg-[#1570ef]" onClick={onClick}>
            <img src={FloatingIcon} alt="floating-icon" width={28} height={28} className='m-2'/>
        </div>
    )
}

export default FloatingBall