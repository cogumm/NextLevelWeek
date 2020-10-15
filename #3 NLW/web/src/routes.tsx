import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import landing from './pages/Landing';
import Orphanage from './pages/Orphanage/';
import OrphanagesMap from './pages/OrphanagesMap';
import OrphanageCreate from './pages/OrphanageCreate/';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={landing} />
                <Route path="/app" component={OrphanagesMap} />
                <Route path="/orphanages/create" component={OrphanageCreate} />
                <Route path="/orphanages/:id" component={Orphanage} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
