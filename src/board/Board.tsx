import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import React from 'react';
import SVG from 'svgjs';
import { getSvgHexGridFactory } from '../svg/SvgGrid';
import { BoardState, defaultHexState, HexState, idCheck, UNINITIALIZED_STATE } from './state/BoardState';
import ClickHandler from '../handler/ClickHandler';
import BoardAction from '../action/BoardAction';
import './Board.css';
import { Hex } from 'honeycomb-grid';

export interface BoardProps {
    state: BoardState;
    selectedHex?: any;
    selectHex: (hex: any) => void;
    initializeBoard: (board: BoardState) => void;
}

class Board extends React.Component<BoardProps> {

    static defaultProps: Partial<BoardProps> = {
        state: UNINITIALIZED_STATE
    };

    private svgRef?: SVG.Doc;
    private grid: any = [];
    private gridFactory: any;
    private readonly BOARD_ID: string = 'board';

    //@Override
    public componentDidMount() {
        this.gridFactory = getSvgHexGridFactory(this.svgRef!);
        this.grid = this.gridFactory({
            radius: 5,
            center: [5, 5]
        });
        this.props.initializeBoard({
            board: this.grid.map(defaultHexState),
            radius: 5,
            center: {
                x: 5,
                y: 5
            }
        });
    }

    public componentDidUpdate() {
        this.renderSvg();
    }

    private initializeSvgRef(ref: any) {
        this.svgRef = this.svgRef || SVG(ref);
    }

    private renderSvg() {
        this.svgRef!.clear();
        if (this.grid !== undefined) {
            this.grid.forEach((hex: any) => hex.render(this.getStateForHex(hex)));
        }
    }

    private getStateForHex(drawnHex: Hex<{}>): HexState | undefined {
        const maybeState = this.props.state.board.find((hex) => idCheck(hex.id, drawnHex));
        // console.log(maybeState);
        return maybeState;
    }

    public render() {
        return (
            <div className='board'>
                The Board
                <div id={this.BOARD_ID} ref={ref => this.initializeSvgRef(ref)}></div>
                <ClickHandler handler={this.getClickHandler()}/>
            </div>
        );
    }

    public getClickHandler() {
        const that = this;
        return ({ offsetX, offsetY, target }: MouseEvent) => {
            // Find better way to suppress clicks outside of the svg/board component
            if ((target as any).className === 'board') {
                console.info('Suppressing click outside of board');
            } else {
                const hexCoordinates = that.gridFactory.Grid.pointToHex(offsetX, offsetY)
                const hex = that.grid.get(hexCoordinates);
                if (hex) {
                    this.props.selectHex(hex);
                }
            }
        };
    }

}

const mapStateToProps = (state: any) => {
    return {
        board: state.boardReducer.board
    };
}

const mapDispatchToProps = (dispatch: Dispatch) => BoardAction(dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Board);