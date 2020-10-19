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
import { xOffset, yOffset } from '../svg/SvgHex';
import { Box, Container } from '@material-ui/core';

export interface BoardProps extends BoardState {
    displayBoard: boolean;
    selectHex: (hex: any) => void;
    initializeBoard: (board: BoardState) => void;
}

class Board extends React.Component<BoardProps> {

    static defaultProps: Partial<BoardProps> = {
        ...UNINITIALIZED_STATE,
        displayBoard: false
    };

    private svgRef?: SVG.Doc;
    private grid: any = [];
    private gridFactory: any;
    private readonly BOARD_ID: string = 'hex-board';

    constructor(props: BoardProps) {
        super(props);
        this.getClickHandler = this.getClickHandler.bind(this);
    }

    public componentDidUpdate() {
        if (this.props.displayBoard) {
            if (!(this.props.board.length > 0)) {
                this.gridFactory = getSvgHexGridFactory(this.svgRef!);
                this.grid = this.gridFactory({
                    radius: this.props.radius,
                    center: this.props.center
                });
                // this.props.initializeBoard({
                //     board: this.grid.map(defaultHexState),
                //     radius: 5,
                //     center: {
                //         x: 5,
                //         y: 5
                //     }
                // });
            }
            this.renderSvg();
        }
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
            <Container fixed style={{
                height: '92vh'
            }}>
                {/* {this.props.displayBoard && */}
                    <Box my={4} display="flex" color="#E0E0E0" justifyContent="center">
                        <div id={this.BOARD_ID} ref={ref => this.initializeSvgRef(ref)}></div>
                    </Box>
                    {/* } */}
                {/* <ClickHandler handler={this.getClickHandler} /> */}

                {/* <pre>{JSON.stringify(this.props, null, 2)}</pre> */}
            </Container>
        );
    }

    public getClickHandler({ offsetX, offsetY, target }: MouseEvent) {
        // Find better way to suppress clicks outside of the svg/board component
        const nodeName = (target as HTMLElement).nodeName;
        if (nodeName === 'tspan' || nodeName === 'polygon') {
            // TODO: Make the xOffset and yOffset part of the state, or some configurable option
            const hexCoordinates = this.gridFactory.Grid.pointToHex(offsetX - xOffset, offsetY - yOffset)
            const hex = this.grid.get(hexCoordinates);
            if (hex) {
                this.props.selectHex(hex);
            } else {
                console.info('Clicked svg outside of board');
            }
        } else {
            console.info('Suppressing click outside of board');
        }
    }

}

const mapStateToProps = ({ appReducer, boardReducer }: any) => ({
    ...boardReducer,
    displayBoard: !!appReducer.session,
    boardInitialized: boardReducer.board.length > 0
});

const mapDispatchToProps = (dispatch: Dispatch) => BoardAction(dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Board);