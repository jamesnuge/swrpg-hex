import { Action } from 'redux';

export interface PayloadAction extends Action {
    payload: any
}

interface SimpleReducerState {
    count: number
}

const defaultState: SimpleReducerState = {
    count: 0
}

export default (state: SimpleReducerState = defaultState, action: PayloadAction) => {
    switch (action.type) {
        case 'SIMPLE_ACTION':
            return {
                ...state,
                count: state.count + 1
            }
        default:
            return state
    }
}