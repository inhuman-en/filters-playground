import React from 'react';
import { Link } from "react-router";

export default class FilterMenu extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <section className="filters">
                    <ul>
                        {this.props.filterList
                            .map((f, i, arr) => <li key={i}>
                                    <Link to={ {pathname: `f/${f.filterFn}`, state: { filterConfig: f } } }>{f.displayName}</Link>
                                </li>)}
                    </ul>
                </section>
        );
    }
}