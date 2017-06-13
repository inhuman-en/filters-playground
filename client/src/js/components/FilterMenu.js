import React from 'react';
import { Link } from "react-router";

export default class FilterMenu extends React.Component {
    
    render() {
        let currentRouteState = this.props.location.state,
            filterType = currentRouteState ? currentRouteState.filterConfig.filterType :
            null;

        return (
            <section class="filters-list">
                    <ul>
                        {this.props.filterList
                            .map((f, i, arr) => <li class={filterType === f.filterType ? "filterlink filterlink-active" : "filterlink"} key={i}>
                                    <Link
                                        to={ {pathname: `f/${f.filterType}`,
                                        
                                        state: { filterConfig: f } } }>{f.displayName}
                                    </Link>
                                </li>)}
                    </ul>
                </section>
        );
    }
}