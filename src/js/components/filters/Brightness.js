import React from "react";

export default class Brightness extends React.Component {

  get defaultValue () {
    return 100;
  }

  onPercentChange (e) {
    this.props.onFilterChange({
        filterType: "brightness",
        value: `${e.target.value === "" ? this.defaultValue : e.target.value}%`
    });
  }

  parsePercent () {
    return parseInt(this.props.filterData.value === "" ? this.defaultValue : this.props.filterData.value);
  }

  render() {
    return (
      <div>
        <span>Amount, %:</span> <input type="number" min="0" value={this.parsePercent()} onChange={this.onPercentChange.bind(this)}/>
      </div>
    );
  }
}