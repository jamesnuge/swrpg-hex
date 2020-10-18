import React, { useEffect } from 'react';
import SVG from 'svgjs';
import { BoardProps } from './Board';
import { Box, Container } from '@material-ui/core';
import ClickHandler from '../handler/ClickHandler';
import { getSvgHexGridFactory } from '../svg/SvgGrid';
import { idCheck, UNINITIALIZED_STATE } from './state/BoardState';
import { Hex } from 'honeycomb-grid';
import { Dispatch } from 'redux';
import BoardAction from '../action/BoardAction';
import { connect } from 'react-redux';
import { NOOP } from '../util/types';
import './Board.css';

const BOARD_ID = 'hex_board';

const FBoard = (props: BoardProps) => {

    // TODO: Figure out ref typings
    let svgRef: any;
    useEffect(() => {
        if (props.displayBoard) {
            let svg: SVG.Doc = svgRef && SVG(svgRef as any);
            const gridFactory = getSvgHexGridFactory(svg);
            const grid = gridFactory({
                radius: props.radius,
                center: props.center
            });

            const getStateForHex = (drawnHex: Hex<{}>) => props.board.find((hex) => idCheck(hex.id, drawnHex));
            grid.forEach((hex: any) => hex.render(getStateForHex(hex), props.center));
        }
    })
    return (
        <Container fixed style={{ height: '92vh' }}>
            <Box my={4} display="flex" color="#E0E0E0" justifyContent="center">
                <div id={BOARD_ID} ref={(ref) => svgRef = ref}></div>
            </Box>
            <ClickHandler handler={generateClickHandler()} />
        </Container>
    );
}

const generateClickHandler = () => () => { }


const mapStateToProps = ({ appReducer, boardReducer }: any) => ({
    ...boardReducer,
    displayBoard: !!appReducer.session,
    boardInitialized: boardReducer.board.length > 0
});

FBoard.defaultProps = {
    ...UNINITIALIZED_STATE,
    selectHex: NOOP as any,
    initializeBoard: NOOP as any,
    displayBoard: false
};

const mapDispatchToProps = (dispatch: Dispatch) => BoardAction(dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(FBoard);