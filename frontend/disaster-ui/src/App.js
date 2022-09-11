import React from 'react';
// import ReactDOM from "react-dom/client";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import './index.css';
import PageOne from './pageOne';
import PageTwo from './pageTwo';

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" element={<PageTwo />} />
                <Route path="/2" element={<PageOne />} />
                <Redirect to="/" />
            </Switch>
        </Router>
    )
}
