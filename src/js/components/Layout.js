import React from "react";
import { Link, Route } from "react-router";
import { connect } from "react-redux";

import { loadFilters } from "../actions";

import NoFilter from "./NoFilter";
import FilterMenu from "./FilterMenu";
import Filterable from "./Filterable";

class Layout extends React.Component {

    componentWillMount() {
        this.props.onLoadFilters();
    }
    
    render() {
        return (
            <main>
                <Filterable></Filterable>
                <FilterMenu filterList={this.props.filterList} location={this.props.location}></FilterMenu>
                {this.props.children}
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
    }
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout)