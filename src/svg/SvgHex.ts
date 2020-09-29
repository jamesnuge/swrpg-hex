import SVG from 'svgjs';
import { extendHex, Hex, BaseHex } from 'honeycomb-grid';

export const getSvgHex = (svg: SVG.Doc) => {
    return extendHex({
        size: 35,
        render() {
            const hexRef: any = this as any;
            const position = hexRef.toPoint()
            const centerPosition = hexRef.center().add(position)
            svg.polygon(hexRef.corners().map((ref: {x: number, y: number}) => `${ref.x},${ref.y}`))
                .fill('#1d2025')
                .stroke(
                    { width: 2, color: '#999' }
                )
                .translate(position.x, position.y)

            const fontSize = 12

            // draw x and y coordinates
            svg.text(`${hexRef.x},${hexRef.y}`)
                .font({
                    size: fontSize,
                    anchor: 'middle',
                    leading: 1.4
                    // color: '#69c'
                })
                .translate(centerPosition.x, centerPosition.y - fontSize)
        }
    });
}