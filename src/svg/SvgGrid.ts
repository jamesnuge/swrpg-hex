import SVG from 'svgjs';
import { getSvgHex } from './SvgHex';
import { defineGrid, HexCoordinates } from 'honeycomb-grid';

export interface SvgHexGridOptions<T = {}> {
    radius: number;
    center?: HexCoordinates;
}

export const getSvgHexGridFactory = (svg: SVG.Doc) => {
    const svgHex = getSvgHex(svg);
    const gridProducer = defineGrid(svgHex);
    const factory = (hexOptions: SvgHexGridOptions) => gridProducer.hexagon({
        ...hexOptions
    });
    factory.Grid = gridProducer;
    return factory;
}

