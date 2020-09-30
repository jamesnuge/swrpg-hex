import { useEffect } from 'react';

export type Handler = (this: Window, ev: MouseEvent) => any

export default function useClickEvent(handler: Handler, passive = false) {
    useEffect(() => {
        // initiate the event handler
        window.addEventListener('click', handler, passive);

        // this will clean up the event every time the component is re-rendered
        return () => {
            window.removeEventListener('click', handler);
        };
    });
}