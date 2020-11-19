import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';

import Chat from './pages/Main';
import Logon from './pages/Logon';

export default function Routes() {

    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Logon}/>
            <Route path="/chat" component={Chat}/>
        </Switch>
        </BrowserRouter>
    );
}