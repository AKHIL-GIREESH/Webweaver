import React, { useRef } from 'react';

type ResizableBoxProps = {
    style: React.CSSProperties;
    onClick: (e: React.MouseEvent) => void;
    children: React.ReactNode;
    onResize: (newDimensions: { width: number; height: number }) => void; // Add this prop
    minWidth?: number;
    minHeight?: number;
};

const ResizableBox: React.FC<ResizableBoxProps> = ({
    style,
    onClick,
    children,
    onResize, // Destructure the new prop
    minWidth = 20,
    minHeight = 20,
}) => {
    const boxRef = useRef<HTMLDivElement>(null);

    const original = useRef({
        width: 0,
        height: 0,
        mouseX: 0,
        mouseY: 0,
        resizer: '' as 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | '',
    });

    const startResize = (
        e: React.MouseEvent,
        resizer: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
    ) => {
        e.stopPropagation();
        e.preventDefault();
        if (!boxRef.current) return;
        const rect = boxRef.current.getBoundingClientRect();
        original.current = {
            width: rect.width,
            height: rect.height,
            mouseX: e.clientX,
            mouseY: e.clientY,
            resizer,
        };
        window.addEventListener('mousemove', resize);
        window.addEventListener('mouseup', stopResize);
    };

    const resize = (e: MouseEvent) => {
        const deltaX = e.clientX - original.current.mouseX;
        const deltaY = e.clientY - original.current.mouseY;

        let newWidth = original.current.width;
        let newHeight = original.current.height;

        switch (original.current.resizer) {
            case 'bottom-right':
                newWidth += deltaX;
                newHeight += deltaY;
                break;
            case 'bottom-left':
                newWidth -= deltaX;
                newHeight += deltaY;
                break;
            case 'top-right':
                newWidth += deltaX;
                newHeight -= deltaY;
                break;
            case 'top-left':
                newWidth -= deltaX;
                newHeight -= deltaY;
                break;
        }

        if (newWidth < (minWidth || 20)) newWidth = minWidth || 20;
        if (newHeight < (minHeight || 20)) newHeight = minHeight || 20;

        // Call the onResize prop with the new dimensions
        onResize({ width: newWidth, height: newHeight });
    };

    const stopResize = () => {
        window.removeEventListener('mousemove', resize);
        window.removeEventListener('mouseup', stopResize);
    };

    // Helper for resizer styles
    const getResizerStyle = (cursor: string, position: React.CSSProperties) => ({
        position: 'absolute' as const,
        width: '10px',
        height: '10px',
        background: 'white',
        border: '2px solid #4286f4',
        borderRadius: '50%',
        cursor,
        zIndex: 1000,
        ...position,
    });

    return (
        <div
            ref={boxRef}
            style={{
                position: 'relative',
                boxSizing: 'border-box',
                border: '2px solid #4286f4',
                padding: 0,
                ...style,
            }}
            onClick={onClick}
        >
            {children}
            {/* Corner resizers */}
            <div
                style={getResizerStyle('nwse-resize', { top: -5, left: -5 })}
                onMouseDown={(e) => startResize(e, 'top-left')}
            />
            <div
                style={getResizerStyle('nesw-resize', { top: -5, right: -5 })}
                onMouseDown={(e) => startResize(e, 'top-right')}
            />
            <div
                style={getResizerStyle('nesw-resize', { bottom: -5, left: -5 })}
                onMouseDown={(e) => startResize(e, 'bottom-left')}
            />
            <div
                style={getResizerStyle('nwse-resize', { bottom: -5, right: -5 })}
                onMouseDown={(e) => startResize(e, 'bottom-right')}
            />
        </div>
    );
};

export default ResizableBox;