import SVG from 'svgjs';
import { extendHex, Hex, HexFactory } from 'honeycomb-grid';
import { HexId, HexState } from '../board/state/BoardState';

export const yOffset = 120;
export const xOffset = -250

interface HexData {
    isHighlighted: boolean;
    isSelected: boolean;
    isSame(data: HexData): boolean;
    drawnHex?: SVG.Polygon;
    text?: SVG.Text;
}

export const getSvgHex: (svg: SVG.Doc) => HexFactory<any> = (svg: SVG.Doc) => {
    return extendHex({
        textColor: '#69c',
        isSelected: false,
        isHighlighted: false,
        icon: undefined,
        size: 35,
        isSame({isSelected, isHighlighted}: HexData) {
            return this.isSelected === isSelected && this.isHighlighted === isHighlighted;
        },
        // TODO: Rename to update. It better reflects what you're doing
        render(state?: HexState, center?: HexId) {
            if (state) {
                const hexRef: Hex<HexData> = this as Hex<HexData>; 
                hexRef.isHighlighted = state.isHighlighted;
                hexRef.isSelected = state.isSelected;
                const position = hexRef.toPoint()
                const centerPosition = hexRef.center().add(position)
                if (hexRef.drawnHex) {
                    hexRef.drawnHex.remove();
                    hexRef.drawnHex = undefined;
                }
                const drawnHex = svg.polygon(hexRef.corners().map((ref: { x: number, y: number }) => `${ref.x},${ref.y}`) as any)
                    .fill({
                        color: state.isSelected ? 'red' : '#1d2025',
                        opacity: 0.4
                    })
                    .stroke(
                        { width: 2, color: '#999' }
                    )
                    .translate(position.x + xOffset, position.y + yOffset)
                hexRef.drawnHex = drawnHex;

                const fontSize = 12

                // draw x and y coordinates
                if (hexRef.text) {
                    hexRef.text.remove();
                    hexRef.text = undefined;
                } 
                const hexText = svg.text(`${hexRef.x},${hexRef.y}`)
                    .font({
                        size: fontSize,
                        anchor: 'middle',
                        leading: 1.4,
                    })
                    .stroke(center && center.x === hexRef.x && center.y === hexRef.y ? 'green' : '#61dafb')
                    .translate(centerPosition.x + xOffset, centerPosition.y - fontSize + yOffset)
                hexRef.text = hexText;
            }
        }
    });
}