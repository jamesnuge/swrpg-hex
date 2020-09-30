import SVG from 'svgjs';
import { extendHex } from 'honeycomb-grid';
import { HexState } from '../board/state/BoardState';

const yOffset = 5;

export const getSvgHex = (svg: SVG.Doc) => {
    return extendHex({
        textColor: '#69c',
        isSelected: false,
        isHighlighted: false,
        icon: undefined,
        size: 35,
        render(state?: HexState) {
            if (state) {
                const hexRef: any = this as any;
                const position = hexRef.toPoint()
                const centerPosition = hexRef.center().add(position)
                svg.polygon(hexRef.corners().map((ref: { x: number, y: number }) => `${ref.x},${ref.y}`))
                    .fill({
                        color: '#1d2025',
                        opacity: 0.4
                    })
                    .stroke(
                        { width: 2, color: '#999' }
                    )
                    .translate(position.x, position.y + 4)

                const fontSize = 12

                // draw x and y coordinates
                svg.text(`${hexRef.x},${hexRef.y}`)
                    .font({
                        size: fontSize,
                        anchor: 'middle',
                        leading: 1.4,
                    })
                    .stroke(state.isSelected ? 'red' : '#61dafb')
                    .translate(centerPosition.x, centerPosition.y - fontSize + yOffset)
            }
        }
    });
}