import React from 'react';
import Modal from 'react-modal';
import appActions from './appActions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NOOP } from '../util/types';
import Board from '../board/Board';
import { Box, Button, Container } from '@material-ui/core';

interface AppProps {
    sessionId?: string;
    isOpen: boolean;
    sessionToJoin?: string;
    openModal: () => void;
    closeModal: () => void;
    startSession: () => void;
};

class App extends React.Component<AppProps> {
    
    static defaultProps = {
        isOpen: true,
        openModal: NOOP,
        closeModal: NOOP,
        startSession: NOOP,
    };

    render() {
        return (
        <>
                <Modal isOpen={this.props.isOpen}>
                    <Container maxWidth="sm">
                        <Box my={4} justifyContent="center">
                            Welcome to SWRPG Hex
                        </Box>
                        <Box my={4} justifyContent="center">
                            <Button color="primary" variant="contained" onClick={this.props.startSession}>Start Session</Button>
                            <Button onClick={this.props.closeModal}>Join Session</Button>
                        </Box>
                    </Container>
                </Modal>
                <Board />
            </>
        );
    }

}

const mapStateToProps = ({ appReducer }: any) => ({
    ...appReducer,
    isOpen: appReducer.startingModalIsOpen
});

const mapDispatchToProps = (dispatch: Dispatch) => appActions(dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);