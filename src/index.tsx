import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
// import Board from './board/Board';
import { Provider } from 'react-redux';
import configureStore from './store';
import App from './app/App';
import Modal from 'react-modal';

Modal.setAppElement(
  '#root'
);

ReactDOM.render(
    <Provider store={configureStore()}>
      <App />
        {/* <Board/> */}
    </Provider>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
