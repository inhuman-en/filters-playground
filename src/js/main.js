import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import "../sass/main.scss";

import Layout from "./components/Layout";
import NoFilter from "./components/NoFilter";
import FilterSettings from "./components/FilterSettings";

window.onload = function () {
    ReactDOM.render(
        <Router history={hashHistory}>
            <Route path="/" component={Layout}>
                <IndexRoute component={NoFilter}></IndexRoute>
                <Route path="f" component={NoFilter}></Route>
                <Route path="f/:filterName" component={FilterSettings}></Route>
            </Route>
        </Router>, 
        document.getElementById('app')
    );
}