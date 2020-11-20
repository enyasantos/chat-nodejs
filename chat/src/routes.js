import React from 'react';
import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';

import Register from './pages/Register';
import Logon from './pages/Logon';
import Chat from './pages/Main';

export default function Routes() {

    return (
        <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Logon}/>
            <Route path="/register" component={Register}/>
            <Route path="/chat" component={Chat}/>
        </Switch>
        </BrowserRouter>
    );
}