import React from 'react';

export interface HandlerProps {
    handler: () => (this: Window, ev: MouseEvent) => void
};

const CLICK = 'click';

export default ({handler}: HandlerProps) => {
    React.useEffect(() => {
        const handlerRef = handler();
        window.addEventListener(CLICK, handlerRef)
        return () => window.removeEventListener(CLICK, handlerRef);
    });
    return (<div className="click-handler"/>)
}