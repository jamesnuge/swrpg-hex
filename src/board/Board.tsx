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

export interface BoardProps extends BoardState {
    selectHex: (hex: any) => void;
    initializeBoard: (board: BoardState) => void;
}

class Board extends React.Component<BoardProps> {

    static defaultProps: Partial<BoardProps> = UNINITIALIZED_STATE;

    private svgRef?: SVG.Doc;
    private grid: any = [];
    private gridFactory: any;
    private readonly BOARD_ID: string = 'board';

    constructor(props: BoardProps) {
        super(props);

        this.clickHandler = this.clickHandler.bind(this);
    }

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
            this.grid.forEach((hex: any) => hex.render(this.getStateForHex(hex), this.props.center));
        }
    }

    private getStateForHex(drawnHex: Hex<{}>): HexState | undefined {
        const maybeState = this.props.board.find((hex) => idCheck(hex.id, drawnHex));
        return maybeState;
    }

    public render() {
        return (
            <div className='board'>
                The Board
                <div id={this.BOARD_ID} ref={ref => this.initializeSvgRef(ref)}></div>
                <ClickHandler handler={this.clickHandler}/>
                {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
            </div>
        );
    }

    public clickHandler({ offsetX, offsetY, target }: MouseEvent) {
            // Find better way to suppress clicks outside of the svg/board component
            if ((target as any as {className: string}).className === 'board') {
                console.info('Suppressing click outside of board');
            } else {
                const hexCoordinates = this.gridFactory.Grid.pointToHex(offsetX, offsetY)
                const hex = this.grid.get(hexCoordinates);
                if (hex) {
                    this.props.selectHex(hex);
                }
            }
    }

}

const mapStateToProps = ({boardReducer}: any) => boardReducer

const mapDispatchToProps = (dispatch: Dispatch) => BoardAction(dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Board);