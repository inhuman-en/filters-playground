import React from 'react';
import { connect } from "react-redux";

import '../../resources/images/filterable.jpg';

const mapFiltersTostyle = (filters) => {
    return filters.map(f => `${f.filterType}(${f.value})`)
        .join(" ");
}

const mapStateToProps = (state) => {
  return {
    cssFilter: mapFiltersTostyle(state.activeFilters)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

class Filterable extends React.Component {
    render() {
        return (
            <section class="image">
                <img style={{filter: this.props.cssFilter}} width="400" height="300" src="filterable.jpg" alt="Filter me!"/>
            </section>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Filterable)