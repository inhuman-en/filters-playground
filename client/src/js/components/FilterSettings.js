import React from "react";
import { connect } from "react-redux";
import { filterChange } from "../actions";

import { NoFilter } from "./NoFilter";



const mapStateToProps = (state) => {
    return {
        activeFilters: state.activeFilters
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFilterChange: (filterData) => {
            dispatch(filterChange(filterData))
        }
    }
}

class FilterSettings extends React.Component {

    getFilterData(filterType) {
        let appliedFilterData = this.props.activeFilters
            .filter(x => (x.filterType === filterType))[0];
        let defaultFilterData = {
                filterType,
                value: ""
            };

        return appliedFilterData || defaultFilterData;
    }

    render() {
        //todo: direct routing to thet filter 
        let routeState = this.props.location.state,
            FilterComponent, filterType;

        if (routeState) {
            FilterComponent = require("./filters/" + routeState.filterConfig.component);
            
            filterType = routeState.filterConfig.filterType;
        } else {
            FilterComponent = require("./NoFilter");
            filterType = this.props.params.filterType;
        }

        return (
            <div>
                <FilterComponent.default filterData={ this.getFilterData(filterType) } onFilterChange={ this.props.onFilterChange } />
            </div>
            );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FilterSettings)