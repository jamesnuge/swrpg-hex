import SVG from 'svgjs';
import { getSvgHex } from './SvgHex';
import { defineGrid, extendHex, HexCoordinates } from 'honeycomb-grid';
import { defaultHexState, HexState } from '../board/state/BoardState';

export interface SvgHexGridOptions<T = {}> {
    radius: number;
    center?: HexCoordinates;
}

export const getSvgHexGridFactory = (svg: SVG.Doc) => {
    const hex = getSvgHex(svg);
    const gridProducer = defineGrid(hex);
    const factory = (hexOptions: SvgHexGridOptions) => gridProducer.hexagon({
        ...hexOptions
    });
    factory.Grid = gridProducer;
    return factory;
}

export const generateBaseGrid = (radius: number) => {
    const board: HexState[] = [];
    const hex = extendHex({});
    const gridProducer = defineGrid(hex);
    gridProducer.hexagon({
        radius,
        center: [radius, radius]
    }).forEach((hex) => board.push(defaultHexState(hex)));
    return board;
}

