import React from "react";
import { Link, Route } from "react-router";
import { connect } from "react-redux";

import { loadFilters, getPersistedFilterable } from "../actions";

import NoFilter from "./NoFilter";
import FilterMenu from "./FilterMenu";
import Filterable from "./Filterable";

class Layout extends React.Component {

    componentWillMount() {
        this.props.onLoadFilters();
    }
    
    render() {
        return (
            <main class="container main">
                <Filterable></Filterable>
                <section class="filters-container" >
                    <FilterMenu filterList={this.props.filterList} location={this.props.location}></FilterMenu>
                    {this.props.children}
                </section>
            </main>
            );
    }
}


const mapStateToProps = (state) => {
  return {
    filterList: state.filterList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadFilters: () => {
        dispatch(loadFilters());
        dispatch(getPersistedFilterable());
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout)