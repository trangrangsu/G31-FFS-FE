import React, { Component } from 'react';

import { AppRouter } from './components';
import './scss/style.scss';

class App extends Component {
    render() {
        localStorage.setItem('items', 'role');
        return <AppRouter />;
    }
}

export default App;
