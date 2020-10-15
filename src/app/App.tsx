import React from 'react';
import Modal from 'react-modal';
import appActions from './appActions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NOOP } from '../util/types';
import Board from '../board/Board';
import { Box, Button, Container, Divider } from '@material-ui/core';

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
        console.log('app props', JSON.stringify(this.props, null, 2));
        return (
        <>
                <Modal isOpen={this.props.isOpen} style={{
                    content: {
                        backgroundColor: '#282c34',
                        top: '22%',
                        bottom: '22%',
                        left: '22%',
                        right: '22%',
                    }
                }}>
                    <Container maxWidth="sm">
                        <Box my={4} display="flex" color="#E0E0E0" justifyContent="center">
                            Welcome to SWRPG Hex
                        </Box>
                        <Box my={4} display="flex" color="#E0E0E0" justifyContent="center">
                            <Button color="primary" variant="contained" onClick={this.props.startSession}>Start Session</Button>
                            <Divider orientation="vertical" flexItem/>
                            <Button color="primary" variant="contained" onClick={this.props.closeModal}>Join Session</Button>
                        </Box>
                    </Container>
                </Modal>
                <Board />
            </>
        );
    }

}

const mapStateToProps = (state: any) => () => {
    console.log('mapping state to props')
    console.log(state);
    return {
        ...state.appReducer,
        isOpen: state.appReducer.isOpen
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => appActions(dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);