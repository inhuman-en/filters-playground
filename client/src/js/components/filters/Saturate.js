import React from "react";

export default class Saturate extends React.Component {
  get defaultValue () {
    return 0;
  }

  onPercentChange (e) {
    this.props.onFilterChange({
        filterType: "saturate",
        value: `${e.target.value === "" ? this.defaultValue : e.target.value}%`
    });
  }

  parsePercent () {
    return parseInt(this.props.filterData.value === "" ? this.defaultValue : this.props.filterData.value);
  }

  render() {
    return (
      <section>
        <label>Amount, %:</label> <input type="number" min="0" value={this.parsePercent()} onChange={this.onPercentChange.bind(this)}/>
      </section>
    );
  }
}