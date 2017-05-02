import React from "react";

export default class FilterSettings extends React.Component {
  constructor() {
    super();
  }

  render() {
    let FilterComponent = this.props.location.state.filterConfig.component;
    // let Instance = require("filters/"+FilterComponent);

    return (
      <div>
        {/*<Instance/>*/}
        Filter Settings for {this.props.params.filterName} cmp - {FilterComponent}
      </div>
    );
  }
}