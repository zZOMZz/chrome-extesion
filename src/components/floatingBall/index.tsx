// import FloatingIcon from '../../assets/floating.svg'
import React, { useRef } from 'react';


interface FloatingBallProps {
    onClick: () => void
}


const FloatingBall: React.FC<FloatingBallProps> = ({ onClick }) => {
    const ballRef = useRef<HTMLDivElement>(null);
    const offset = useRef({ y: 0 }); // 用于保存鼠标与元素的偏移量
    const isDragging = useRef(false); // 用于标记是否正在拖动
    const startPosition = useRef({ y: 0 }); // 用于保存元素初始位置
    

    const handleMouseDown = (e) => {
        const ball = ballRef.current;
        if (!ball) return;

        startPosition.current = {
            // x: e.clientX,
            y: e.clientY,
        }

        // 获取鼠标点击位置与元素左上角的偏移
        const rect = ball.getBoundingClientRect();
        offset.current = {
            // x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        };

        isDragging.current = false;

        // 添加全局事件监听
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e) => {
        const ball = ballRef.current;
        if (!ball) return;

        // 计算鼠标移动距离
        // const distanceX = e.clientX - startPosition.current.x;
        const distanceY = e.clientY - startPosition.current.y;

        // 如果移动距离大于阈值，标记为拖动
        if (Math.abs(distanceY) > 5) {
            isDragging.current = true;

            // 计算新的位置
            // const newX = e.clientX - offset.current.x;
            const newY = e.clientY - offset.current.y;

            // 限制元素拖动范围
            // const maxRight = window.innerWidth - ball.offsetWidth; // 窗口右侧边界
            const maxBottom = window.innerHeight - ball.offsetHeight; // 窗口底部边界
            // const clampedX = Math.min(maxRight, Math.max(0, newX));
            const clampedY = Math.min(maxBottom, Math.max(0, newY));

            // 更新位置
            ball.style.top = `${clampedY}px`;
            // ball.style.left = `${clampedX}px`;
        }
    };

    const handleMouseUp = () => {
        // 移除全局事件监听
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);

        // 如果没有拖动，触发点击事件
        if (!isDragging.current) {
            onClick();
        }
    };

    return (
        <div
            ref={ballRef}
            className="fixed w-[88px] z-50 cursor-pointer bg-sunken  shadow-[0_5px_25px_rgba(0,0,0,0.1),0_3.2px_12px_rgba(0,0,0,0.08)] 
                 rounded-[24px_0_0_24px] selection:transition-all duration-300 right-0  "
            onMouseDown={handleMouseDown}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateX(0)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateX(48px)';
            }}
            style={{
                top: "70%",
                transform: "translateX(48px)",
            }}
        >
            <img
                src="https://s1.ssl.qhres2.com/static/4c6346ad9fada294.svg"
                alt="floating-icon"
                width={28}
                height={28}
                className="m-2 select-none"
            />
        </div>
    );
};

export default FloatingBall;
