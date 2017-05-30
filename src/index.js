import React from 'react';
import ReactDOM from 'react-dom';
import App from './web/App';
import registerServiceWorker from './web/registerServiceWorker';
import './web/index.css';

import { Provider } from 'react-redux';
import configureStore from './redux/store';
const store = configureStore()


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
