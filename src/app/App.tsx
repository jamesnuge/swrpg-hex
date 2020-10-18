import React, { ChangeEvent, useState } from 'react';
import Modal from 'react-modal';
import appActions from './appActions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import Board from '../board/Board';
import FBoard from '../board/FunctionalBoard';
import { Box, Button, Container, Divider, TextField } from '@material-ui/core';
import SessionDisplayComponent from '../board/session/SessionDisplayComponent';
import { RootStore } from '../reducer/RootReducer';
import { createThrottledEventHandler } from '../util/react';

interface AppProps {
    sessionId?: string;
    isOpen: boolean;
    isJoiningSession: boolean;
    sessionToJoin?: string;
    startSession: () => void;
    joinSession: (id: string) => void;
};

const App = (props: AppProps) => {
    const [isJoiningSession, setIsJoiningSession] = useState(false);
    const joinSession = () => setIsJoiningSession(true);
    let sessionId: string | undefined;
    const setSessionId = createThrottledEventHandler((event: ChangeEvent<HTMLInputElement>) => {
        if (event.nativeEvent.target) {
            sessionId = (event.nativeEvent.target as HTMLInputElement).value
        }
    }, 100);
    return (
        <>
            <Modal isOpen={props.isOpen} style={{
                content: {
                    backgroundColor: '#282c34',
                    top: '30%',
                    bottom: '35%',
                    left: '30%',
                    right: '30%',
                }
            }}>
                <Container maxWidth="sm">
                    {!isJoiningSession && <>
                    <Box my={4} display="flex" color="#E0E0E0" justifyContent="center">
                            Welcome to SWRPG Hex
                    </Box>
                    <Box my={4} display="flex" color="#E0E0E0" justifyContent="center">
                        <Button color="primary" variant="contained" onClick={props.startSession}>Start Session</Button>
                        <Divider orientation="vertical" flexItem />
                        <Button color="primary" variant="contained" onClick={joinSession}>Join Session</Button>
                    </Box>
                    </>
                    }
                    {isJoiningSession &&
                        <Box my={4} display="flex" color="#E0E0E0" justifyContent="center">
                            <form>
                                <TextField label='Session Id' onChange={(event: any) => setSessionId(event)}/>
                            </form>
                            <Divider orientation="vertical" flexItem />
                            <Button color="primary" variant="contained" onClick={() => console.log(sessionId)}>
                                Connect
                            </Button>
                        </Box>
                    }
                </Container>
            </Modal>
            {/* <Board /> */}
            <FBoard />
            <SessionDisplayComponent />
        </>
    );

}

const mapStateToProps = ({ appReducer }: RootStore) => ({
    isOpen: !appReducer.session,
    isJoiningSession: appReducer.isJoiningSession
});

const mapDispatchToProps = (dispatch: Dispatch) => appActions(dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);