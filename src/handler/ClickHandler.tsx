import React from 'react';

export interface HandlerProps {
    handler: () => (this: Window, ev: MouseEvent) => void
};

export default (props: HandlerProps) => {
    React.useEffect(() => {
        console.log('adding click handler');
        const handler = props.handler();
        window.addEventListener('click', handler)
        return () => window.removeEventListener('click', handler);
    });
    return (<div className="click-handler"/>)
}