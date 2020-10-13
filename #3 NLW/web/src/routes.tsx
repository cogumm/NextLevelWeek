import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import landing from './pages/Landing/Landing';
import orfanagesMap from './pages/Orfanages/OrfanagesMap';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={landing} />
                <Route path="/app" component={orfanagesMap} />
            </Switch>
        </BrowserRouter>
    );
}


export default Routes;