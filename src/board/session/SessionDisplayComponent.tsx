import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { RootStore } from '../../reducer/RootReducer';
import { Restore, Share } from '@material-ui/icons';
import { Runnable } from '../../util/types';
import { Dispatch } from 'redux';

export interface SessionDisplayProps {
    sessionId?: string;
    restoreSession: Runnable;
}

// const SESSION_RESTORE = 'RESTORE',
//     SESSION_SHARE = 'SHARE';

// type SessionDisplayAction = typeof SESSION_RESTORE | typeof SESSION_SHARE;

const SessionDisplayComponent = ({sessionId, restoreSession}: SessionDisplayProps) => {
    const handleChange = (value: unknown) => {
        console.log(value);
        console.log(sessionId);
        console.log(restoreSession);
    };
    return <BottomNavigation
        showLabels
        onChange={handleChange}
    >
        <BottomNavigationAction label="Restore" value={'RESTORE'} icon={<Restore/>} />
        <BottomNavigationAction label="Share" value={'SHARE'} icon={<Share/>} />
    </BottomNavigation>
}

const mapStateToProps: (state: RootStore) => Partial<SessionDisplayProps> = ({ appReducer }) => {
    const { session } = appReducer;
    return {
        sessionId: session ? session.sessionId : undefined
    };
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        restoreSession: () => console.log('RESTORING THE SESSION')
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionDisplayComponent);