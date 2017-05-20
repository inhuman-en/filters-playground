import React from "react";
import { Router, Route, IndexRoute, hashHistory } from "react-router";
import { Provider } from 'react-redux';

import { loadFilters } from "../actions";

import Layout from "./Layout";
import NoFilter from "./NoFilter";
import FilterSettings from "./FilterSettings";

export default class Root extends React.Component {
    render () {
        return <Provider store={ this.props.store }>
                    <Router history={ hashHistory }>
                        <Route path="/" component={ Layout }>
                            <IndexRoute component={ NoFilter }></IndexRoute>
                            <Route path="f" component={ NoFilter }></Route>
                            <Route path="f/:filterType" component={ FilterSettings }></Route>
                        </Route>
                    </Router>
                </Provider>
    }
};