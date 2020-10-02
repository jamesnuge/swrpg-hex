import React from 'react';
import ReactModal from 'react-modal';
import appActions from './appActions';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { NOOP } from '../util/types';

interface AppProps {
    sessionId?: string;
    isOpen: boolean;
    openModal: () => void;
    closeModal: () => void;
};

interface AppState {
}


class App extends React.Component<AppProps> {
    
    static defaultProps = {
        isOpen: true,
        openModal: NOOP,
        closeModal: NOOP
    };

    constructor(props: AppProps) {
        super(props);
    }

    render() {
        return (
        <div id='root'>
            <ReactModal isOpen={this.props.isOpen}>
                test modal
                <button onClick={this.props.closeModal}>Close</button>
            </ReactModal>
        </div>
        );
    }

}

const mapStateToProps = ({appReducer}: any) => appReducer
const mapDispatchToProps = (dispatch: Dispatch) => appActions(dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);