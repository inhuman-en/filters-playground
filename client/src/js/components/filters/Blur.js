import React from "react";

export default class Blur extends React.Component {

  get defaultValue () {
    return 0;
  }

  onRadiusChange (e) {
    this.props.onFilterChange({
        filterType: "blur",
        value: `${e.target.value === "" ? this.defaultValue : e.target.value}px`
    });
  }

  parseRadius () {

    return parseInt(this.props.filterData.value === "" ? this.defaultValue : this.props.filterData.value);
  }

  render() {
    return (
      <section class="settings-blur">
        <label>Radius, px:</label> <input type="number" min="0" value={this.parseRadius()} onChange={this.onRadiusChange.bind(this)}/>
      </section>
    );
  }
}