import React from "react";

import store from "../../filterStore";
import { filterChange } from "../../actions";

export default class Opacity extends React.Component {
  get defaultValue () {
    return 100;
  }
  
  onPercentChange (e) {
    this.props.onFilterChange({
        filterType: "opacity",
        value: `${e.target.value === "" ? this.defaultValue : e.target.value}%`
    });
  }

  parsePercent () {
    return parseInt(this.props.filterData.value === "" ? this.defaultValue : this.props.filterData.value);
  }

  render() {
    return (
      <section>
        <label>Amount, %:</label> <input type="number" min="0" max="100" value={this.parsePercent()} onChange={this.onPercentChange.bind(this)}/>
      </section>
    );
  }
}