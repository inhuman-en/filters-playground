import React from "react";
import { Link, Route } from "react-router";

import NoFilter from "./NoFilter";
import FilterMenu from "./FilterMenu";
import Filterable from "./Filterable";

export default class Layout extends React.Component {
    constructor() {
        super();
    }

    render() {
        const {location} = this.props;

        return (
            <main>
                <Filterable></Filterable>
                <FilterMenu location={ location }></FilterMenu>
                {this.props.children}
            </main>
            );
    }
}