import { BottomNavigation, BottomNavigationAction, Snackbar } from '@material-ui/core';
import React, { ChangeEvent, SyntheticEvent, useState } from 'react';
import { connect } from 'react-redux';
import { RootStore } from '../../reducer/RootReducer';
import { Restore, Share } from '@material-ui/icons';
import { isUndefined, Runnable } from '../../util/types';
import { copyTextToClipboard } from '../../util/copy';
import appActions from '../../app/appActions';

export interface SessionDisplayProps {
    sessionId?: string;
    resetSession: Runnable;
}

const SESSION_RESET = 'RESET',
    SESSION_SHARE = 'SHARE';

type SessionDisplayAction = typeof SESSION_RESET | typeof SESSION_SHARE;

const SessionDisplayComponent = ({sessionId, resetSession}: SessionDisplayProps) => {
    const [showNotification, setShowNotification] = useState(false);
    const handleChange = (_event: ChangeEvent<{}>, value: SessionDisplayAction) => {
        switch (value) {
            case SESSION_SHARE:
                if (!isUndefined(sessionId)) {
                    copyTextToClipboard(sessionId);
                    setShowNotification(true);
                }
                break;
            case SESSION_RESET:
                resetSession();
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
            <BottomNavigationAction label="Reset" value={SESSION_RESET} icon={<Restore />} />
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

const mapDispatchToProps = appActions

export default connect(mapStateToProps, mapDispatchToProps)(SessionDisplayComponent);