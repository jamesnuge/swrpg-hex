import { connect } from 'react-redux';
import React from 'react';
import SVG from 'svgjs';
import { getSvgHexGridFactory } from '../svg/SvgGrid';
import './Board.css';
import { defaultHexState, BoardState } from './state/BoardState';
import ClickHandler from '../handler/ClickHandler';
import { Dispatch } from 'redux';
import BoardAction from '../action/BoardAction';

interface InitializedBoard {
    svgRef: SVG.Doc;
}

export interface BoardProps {
    title: string;
    boardState: BoardState;
    selectedHex?: any;
    selectHex: (hex: any) => void;
}

export interface BoardComponentState {
}

class Board extends React.Component<BoardProps, BoardComponentState> {

    static defaultProps: BoardProps = {
        title: 'The Board',
        boardState: [],
        selectHex: () => {}
    };

    private svgRef?: SVG.Doc;
    private grid: any = [];
    private gridFactory: any;

    //@Override
    public componentDidMount() {
        this.gridFactory = getSvgHexGridFactory(this.svgRef!);
        this.grid = this.gridFactory({
            radius: 5,
            center: [5, 5]
        });
        this.renderSvg();
        this.setState({
            hexState: this.grid
                .map(defaultHexState)
        });
    }

    public componentDidUpdate() {
        this.renderSvg();
    }

    private initializeSvgRef(ref: any) {
        this.svgRef = this.svgRef || SVG(ref);
    }

    private renderSvg() {
        console.log('rendering svg')
        console.log('props at render time: ', this.props)
        if (this.props.selectedHex !== undefined) {
            const {x, y} = this.props.selectedHex;
            const maybeSelected = this.grid.find((hex: {x: number, y: number}) => hex.x === x && hex.y === y);
            if (maybeSelected !== undefined) {
                maybeSelected.isSelected = true;
            }
            console.log(maybeSelected);
        }
        if (this.grid !== undefined) {
            this.grid.forEach((hex: {render: () => void}) => hex.render());
        }
    }

    public render() {
        return (
            <div className='board'>
                {this.props.title}
                <div id='board' ref={ref => this.initializeSvgRef(ref)}></div>
                <ClickHandler handler={this.getClickHandler()}/>
                <pre>{JSON.stringify(this.props, null, 2)}</pre>
            </div>
        );
    }

    public handleClick({offsetX, offsetY}: MouseEvent) {
        console.log({offsetX, offsetY});
        console.log(this.gridFactory);
    }

    public getClickHandler() {
        const that = this;
        return ({offsetX, offsetY}: MouseEvent) => {
            console.log({ offsetX, offsetY });
            const hexCoordinates = that.gridFactory.Grid.pointToHex(offsetX, offsetY)
            const hex = that.grid.get(hexCoordinates);
            if (hex) {
                //log 'selected' action here
                console.log(hex);
                this.props.selectHex(hex);
            }
        };
    }

}


const mapStateToProps = (state: any) => {
    // return state.boardReducer;
    return {
        ...state.boardReducer
    };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    const {selectHex} = BoardAction(dispatch);
    return {selectHex};
}

export default connect(mapStateToProps, mapDispatchToProps)(Board);