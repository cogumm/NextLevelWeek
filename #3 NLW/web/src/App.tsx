import React from 'react';
import Routes from './routes';

import GlobalStyle from './styles/global';
import 'leaflet/dist/leaflet.css';

function App() {
    return (
        <>
            <Routes />
            <GlobalStyle />
        </>
    );
}

export default App;
