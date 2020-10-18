import { Hex } from 'honeycomb-grid';
import { generateBaseGrid } from '../../svg/SvgGrid';

export interface HexId {
    x: number;
    y: number;
}

export interface HexState {
    id: HexId;
    isHighlighted: boolean;
    isSelected: boolean;
    icon?: string;
}

export type BoardState = {
    board: HexState[]
    radius: number;
    center: HexId;
};

export const findHexForState = (id: HexId, board: HexState[]) => {
    return board.find((hex) => hex.id.x === id.x && hex.id.y === id.y);
}

export function withHex(id: HexId, board: HexState[], consumer: (hex: HexState) => void) {
   const maybeHex = findHexForState(id, board);
   if (maybeHex) {
       consumer(maybeHex);
   }
}

export function fromHex<T>(id: HexId, board: Hex<HexState>[], transform: (hex: HexState) => T): T | undefined {
   const maybeHex = findHexForState(id, board);
   if (maybeHex) {
       transform(maybeHex);
   } else {
       return undefined;
   }
}

// returns a deep cloned board state
export function selectHexInBoard(id: HexId, state: BoardState): BoardState {
    return Object.assign({}, state, {
        board: state.board.map((hex) => {
            return Object.assign({}, hex, {
                isSelected: idCheck(hex.id, id)
            });
        })
    });
}

export function deselect(state: BoardState): BoardState {
    return Object.assign({}, state, {
        board: state.board.map((hex) => {
            return Object.assign({}, hex, {
                isSelected: false
            });
        })
    });
}

export function idCheck(a: HexId, b: HexId) {
    return a.x === b.x &&
        a.y === b.y;
}

export function defaultHexState({ x, y }: { x: number, y: number }): HexState {
    return {
        id: {
            x,
            y
        },
        isHighlighted: false,
        isSelected: false,
    }
}

export const generateBoard: (radius: number) => BoardState = (radius: number) => {
    const baseGrid = generateBaseGrid(radius);
    return {
        board: baseGrid,
        radius,
        center: {
            x: radius,
            y: radius
        }
    }
}

export const UNINITIALIZED_STATE: BoardState = {
    board: [],
    radius: -1,
    center: {
        x: -1,
        y: -1
    }
};