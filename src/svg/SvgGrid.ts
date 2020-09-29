import SVG from 'svgjs';
import { getSvgHex } from './SvgHex';
import { defineGrid, HexCoordinates, onCreateCallback } from 'honeycomb-grid';

export interface SvgHexGridOptions<T = {}> {
    radius: number;
    center?: HexCoordinates;
}

export const getSvgHexGridFactory = (svg: SVG.Doc) => {
    const svgHex = getSvgHex(svg);
    const gridProducer = defineGrid(svgHex);
    return (hexOptions: SvgHexGridOptions) => gridProducer.hexagon({
        ...hexOptions
    });
}

