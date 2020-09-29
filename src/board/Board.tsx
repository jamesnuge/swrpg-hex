import React from 'react';
import SVG from 'svgjs';
import { getSvgHexGridFactory } from '../svg/SvgGrid';
import './Board.css';

interface InitializedBoard {
    svgRef: SVG.Doc;
}

export class Board extends React.Component {

    private svgRef?: SVG.Doc;
    private grid: any[] = [];

    //@Override
    public componentDidMount() {
        this.grid = getSvgHexGridFactory(this.svgRef!)({
            radius: 5,
            center: [5, 5]
        });
        this.renderSvg();
    }

    public componentDidUpdate() {
        this.renderSvg();
    }

    private initializeSvgRef(ref: any) {
        this.svgRef = this.svgRef || SVG(ref);
    }

    private renderSvg() {
        if (this.grid !== undefined) {
            this.grid.forEach((hex) => hex.render());
        }
    }

    public render() {
        return (
            <div className='board'>
                The Board
                <div id='board' ref={ref => this.initializeSvgRef(ref)}></div>
            </div>
        );
    }

}