import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import landing from './pages/Landing';
import Orfanage from './pages/Orfanage/';
import OrfanagesMap from './pages/OrfanagesMap';
import OrfanageCreate from './pages/OrfanageCreate/';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={landing} />
                <Route path="/app" component={OrfanagesMap} />
                <Route path="/orphanages/create" component={OrfanageCreate} />
                <Route path="/orphanages/:id" component={Orfanage} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
