import React from 'react';
import ReactDOM from 'react-dom';
import store from './redux/store';
import App from './App.js'

import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
        {/* <PersistGate loading={"loading"} persistor={persistor}> */}
        <App />
        {/* </PersistGate> */}
    </Provider>,
    document.getElementById('app')
);

module.hot.accept()
