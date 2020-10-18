import { BottomNavigation, BottomNavigationAction, Snackbar } from '@material-ui/core';
import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { connect } from 'react-redux';
import { RootStore } from '../../reducer/RootReducer';
import { Restore, Share } from '@material-ui/icons';
import { isUndefined, Runnable } from '../../util/types';
import { Dispatch } from 'redux';
import { copyTextToClipboard } from '../../util/copy';

export interface SessionDisplayProps {
    sessionId?: string;
    restoreSession: Runnable;
}

const SESSION_RESTORE = 'RESTORE',
    SESSION_SHARE = 'SHARE';

// type SessionDisplayAction = typeof SESSION_RESTORE | typeof SESSION_SHARE;

const SessionDisplayComponent = ({sessionId, restoreSession}: SessionDisplayProps) => {
    const [showNotification, setShowNotification] = useState(false);
    const handleChange = (_event: ChangeEvent<{}>, value: string) => {
        switch (value) {
            case SESSION_SHARE:
                if (!isUndefined(sessionId)) {
                    copyTextToClipboard(sessionId);
                    setShowNotification(true);
                }
                break;
            default:
                break;
        }
    };
    const handleClose = (_event: SyntheticEvent, reason: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setShowNotification(false);
    };

    return <>
        <BottomNavigation
            showLabels
            onChange={handleChange}>
            <BottomNavigationAction label="Restore" value={SESSION_RESTORE} icon={<Restore />} />
            <BottomNavigationAction label="Share" value={SESSION_SHARE} icon={<Share />} />
        </BottomNavigation>

        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={showNotification}
            autoHideDuration={6000}
            onClose={handleClose}
            message="Shareable link copied to clipboard"
        />
    </>
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