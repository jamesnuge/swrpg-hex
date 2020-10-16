import React from 'react';
import Modal from 'react-modal';
import appActions from './appActions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NOOP } from '../util/types';
import Board from '../board/Board';
import { Box, Button, Container, Divider } from '@material-ui/core';
import SessionDisplayComponent from '../board/session/SessionDisplayComponent';

interface AppProps {
    sessionId?: string;
    isOpen: boolean;
    sessionToJoin?: string;
    startSession: () => void;
};

class App extends React.Component<AppProps> {
    
    static defaultProps = {
        isOpen: true,
        startSession: NOOP,
    };

    render() {
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
                            <Button color="primary" variant="contained" onClick={this.props.startSession}>Join Session</Button>
                        </Box>
                    </Container>
                </Modal>
                <Board />
                <SessionDisplayComponent/>
            </>
        );
    }

}

const mapStateToProps = ({appReducer}: any) => ({
        isOpen: !appReducer.session
});

const mapDispatchToProps = (dispatch: Dispatch) => appActions(dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);