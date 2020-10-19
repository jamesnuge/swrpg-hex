import React, { useEffect } from 'react';
import SVG from 'svgjs';
import { BoardProps } from './Board';
import { Box, Container } from '@material-ui/core';
import ClickHandler from '../handler/ClickHandler';
import { getSvgHexGridFactory } from '../svg/SvgGrid';
import { idCheck, UNINITIALIZED_STATE } from './state/BoardState';
import { Grid, GridFactory, Hex } from 'honeycomb-grid';
import { Dispatch } from 'redux';
import BoardAction from '../action/BoardAction';
import { connect } from 'react-redux';
import { NOOP } from '../util/types';
import './Board.css';
import { xOffset, yOffset } from '../svg/SvgHex';

const BOARD_ID = 'hex_board';

const FBoard = (props: BoardProps) => {
    let svgRef: HTMLDivElement;
    let gridFactory: any;
    let grid: any;
    const getStateForHex = (drawnHex: Hex<{}>) => props.board.find((hex) => idCheck(hex.id, drawnHex));
    const clickHandlerFactory = () => ({ offsetX, offsetY, target }: MouseEvent) => {
        // Find better way to suppress clicks outside of the svg/board component
        const nodeName = (target as HTMLElement).nodeName;
        if (nodeName === 'tspan' || nodeName === 'polygon') {
            // TODO: Make the xOffset and yOffset part of the state, or some configurable option
            const hexCoordinates = gridFactory.pointToHex(offsetX - xOffset, offsetY - yOffset)
            const hex = grid.get(hexCoordinates);
            if (hex) {
                props.selectHex(hex);
            } else {
                console.info('Clicked svg outside of board');
            }
        } else {
            console.info('Suppressing click outside of board');
        }
    }
    useEffect(() => {
        if (props.displayBoard) {
            let svg: SVG.Doc = svgRef && SVG(svgRef);
            gridFactory = getSvgHexGridFactory(svg);
            grid = gridFactory({
                radius: props.radius,
                center: props.center
            });
            grid.forEach((hex: any) => hex.render(getStateForHex(hex), props.center));
        }
    });
    return (
        <Container fixed style={{ height: '92vh' }}>
            <Box my={4} display="flex" color="#E0E0E0" justifyContent="center">
                <div ref={(ref) => svgRef = ref!}></div>
            </Box>
            <ClickHandler handler={clickHandlerFactory} />
        </Container>
    );
}

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