import React from 'react';

export interface HandlerProps {
    handler: (this: Window, ev: MouseEvent) => void
};

export default (props: HandlerProps) => {
    React.useEffect(() => {
        console.log('adding click handler');
        window.addEventListener('click', props.handler)
        return () => window.removeEventListener('click', props.handler);
    });
    return (<div className="click-handler"/>)
}