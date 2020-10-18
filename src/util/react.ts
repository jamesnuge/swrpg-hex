import _ from 'lodash';
import { SyntheticEvent } from 'react';

export const createThrottledEventHandler = <E = Event>(eventHandler: (event: E) => void, timeInMs: number) => {
    const throttled = _.throttle(eventHandler, timeInMs);
    return (event: E) => {
        if (isSyntheticEvent(event)) {
            event.persist();
        }
        throttled(event);
    }
}

function isSyntheticEvent(event: any): event is SyntheticEvent {
    return event.persist && event.persist instanceof Function
}