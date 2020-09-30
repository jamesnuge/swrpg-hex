import { Hex } from 'honeycomb-grid';

export interface HexState {
    id: {
        x: number;
        y: number;
    };
    isHighlighted: boolean;
    isSelected: boolean;
    icon?: string;
}

export type BoardState = HexState[];

export const findHexForState = ({id}: HexState, board: Hex<{}>[]) => {
    return board.find((hex) => hex.x === id.x && hex.y === id.y);
}

export function defaultHexState({x, y}: {x: number, y: number}): HexState {
    return {
        id: {
            x,
            y
        },
        isHighlighted: false,
        isSelected: false,
    }
}