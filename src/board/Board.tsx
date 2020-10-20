import React, { MutableRefObject as Ref, useRef, useEffect } from 'react';
import SVG from 'svgjs';
import { Box, Container } from '@material-ui/core';
import ClickHandler from '../handler/ClickHandler';
import { getSvgHexGridFactory, SvgHexFactory } from '../svg/SvgGrid';
import { BoardState, idCheck, UNINITIALIZED_STATE } from './state/BoardState';
import { Grid, Hex } from 'honeycomb-grid';
import { Dispatch } from 'redux';
import BoardAction from '../action/BoardAction';
import { connect } from 'react-redux';
import { Consumer, NOOP } from '../util/types';
import { xOffset, yOffset } from '../svg/SvgHex';
import './Board.css';

export interface BoardProps extends BoardState {
    displayBoard: boolean;
    selectHex: (hex: Hex<any>) => void;
}

const Board = (props: BoardProps) => {
    let svgRef: HTMLDivElement;
    let svgElement: Ref<SVG.Doc | undefined> = useRef<SVG.Doc>();
    let gridFactory: Ref<SvgHexFactory | undefined> = useRef();
    let grid: Ref<Grid<any> | undefined> = useRef();
    const getStateForHex = (drawnHex: Hex<{}>) => props.board.find((hex) => idCheck(hex.id, drawnHex));

    const clickHandler = clickHandlerFactory(gridFactory, grid, props.selectHex);

    useEffect(() => {
        if (props.displayBoard) {
            if (svgElement.current) {
                svgElement.current.clear();
            } else {
                svgElement.current = SVG(svgRef);
            }
            gridFactory.current = gridFactory.current || getSvgHexGridFactory(svgElement.current);
            grid.current = gridFactory.current({
                radius: props.radius,
                center: props.center
            });
            grid.current.forEach((hex: any) => hex.render(getStateForHex(hex), props.center));
        }
    });

    return (
        <Container fixed style={{ height: '92vh' }}>
            <Box my={4} display="flex" color="#E0E0E0" justifyContent="center">
                <div ref={(ref) => svgRef = ref!}></div>
            </Box>
            <ClickHandler handler={clickHandler} />
        </Container>
    );
}

const clickHandlerFactory = (
    gridFactory: Ref<SvgHexFactory | undefined>,
    grid: Ref<Grid<any> | undefined>,
    selectHex: Consumer<any>
) => () => ({ offsetX, offsetY, target }: MouseEvent) => {
    // Find better way to suppress clicks outside of the svg/board component
    const nodeName = (target as HTMLElement).nodeName;
    if (nodeName === 'tspan' || nodeName === 'polygon') {
        // TODO: Make the xOffset and yOffset part of the state, or some configurable option
        const hexCoordinates = gridFactory.current!.Grid.pointToHex(offsetX - xOffset, offsetY - yOffset)
        const hex = grid.current!.get(hexCoordinates);
        if (hex) {
            selectHex(hex);
        } else {
            console.info('Clicked svg outside of board');
        }
    } else {
        console.info('Suppressing click outside of board');
    }
}

const mapStateToProps = ({ appReducer, boardReducer }: any) => ({
    ...boardReducer,
    displayBoard: !!appReducer.session,
    boardInitialized: boardReducer.board.length > 0
});

Board.defaultProps = {
    ...UNINITIALIZED_STATE,
    selectHex: NOOP as any,
    initializeBoard: NOOP as any,
    displayBoard: false
};

const mapDispatchToProps = (dispatch: Dispatch) => BoardAction(dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Board);