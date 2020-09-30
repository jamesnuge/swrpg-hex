import { Hex } from 'honeycomb-grid';

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

export type BoardState = HexState[];

export const findHexForState = (id: HexId, board: BoardState) => {
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
export function selectHexInBoard(id: HexId, board: BoardState): BoardState {
    return board.map((hex) => {
        return Object.assign({}, hex, {
            isSelected: idCheck(hex.id, id)
        });
    });
}

export function deselect(board: BoardState) {
    return board.map((hex) => {
        return Object.assign({}, hex, {
            isSelected: false
        });
    });
}

export function idCheck(a: HexId, b: HexId) {
    return a.x === b.x &&
        a.y === b.y;
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