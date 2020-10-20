import SVG from 'svgjs';
import { getSvgHex } from './SvgHex';
import { defineGrid, extendHex, Grid, GridFactory, HexCoordinates, HexFactory } from 'honeycomb-grid';
import { defaultHexState, HexState } from '../board/state/BoardState';

export interface SvgHexGridOptions<T = {}> {
    radius: number;
    center?: HexCoordinates;
}

export interface SvgHexFactory {
    (svg: SvgHexGridOptions): Grid<any>;
    Grid: GridFactory<any>;
}

export const getSvgHexGridFactory: (svg: SVG.Doc) => SvgHexFactory = (svg: SVG.Doc) => {
    const hex = getSvgHex(svg);
    const gridProducer = defineGrid<HexFactory<unknown>>(hex);
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

