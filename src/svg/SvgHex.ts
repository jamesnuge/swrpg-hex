import SVG from 'svgjs';
import { extendHex, HexFactory } from 'honeycomb-grid';
import { HexId, HexState } from '../board/state/BoardState';

export const yOffset = 120;
export const xOffset = -250

export const getSvgHex: (svg: SVG.Doc) => HexFactory<any> = (svg: SVG.Doc) => {
    return extendHex({
        textColor: '#69c',
        isSelected: false,
        isHighlighted: false,
        icon: undefined,
        size: 35,
        render(state?: HexState, center?: HexId) {
            if (state) {
                const hexRef: any = this as any;
                const position = hexRef.toPoint()
                const centerPosition = hexRef.center().add(position)
                if (state.id.x === 5 && state.id.y === 5) {
                    console.log('drawing center hex', centerPosition);
                }
                svg.polygon(hexRef.corners().map((ref: { x: number, y: number }) => `${ref.x},${ref.y}`))
                    .fill({
                        color: state.isSelected ? 'red' : '#1d2025',
                        opacity: 0.4
                    })
                    .stroke(
                        { width: 2, color: '#999' }
                    )
                    .translate(position.x + xOffset, position.y + yOffset)

                const fontSize = 12

                // draw x and y coordinates
                svg.text(`${hexRef.x},${hexRef.y}`)
                    .font({
                        size: fontSize,
                        anchor: 'middle',
                        leading: 1.4,
                    })
                    .stroke(center && center.x === hexRef.x && center.y === hexRef.y ? 'green' : '#61dafb')
                    .translate(centerPosition.x + xOffset, centerPosition.y - fontSize + yOffset)
            }
        }
    });
}