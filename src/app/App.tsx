import React from 'react';
import ReactModal from 'react-modal';
import appActions from './appActions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NOOP } from '../util/types';
import Board from '../board/Board';

interface AppProps {
    sessionId?: string;
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
    startSession: () => void;
};

interface AppState {
}


class App extends React.Component<AppProps> {
    
    static defaultProps = {
        isOpen: true,
        openModal: NOOP,
        closeModal: NOOP,
        startSession: NOOP,
    };

    render() {
        return (
        <div>
            <ReactModal isOpen={this.props.isOpen}>
                test modal
                <button onClick={this.props.startSession}>Start Session</button>
                <button onClick={this.props.closeModal}>Join Session</button>
            </ReactModal>
            <Board/>
        </div>
        );
    }

}

const mapStateToProps = ({appReducer}: any) => appReducer
const mapDispatchToProps = (dispatch: Dispatch) => appActions(dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);