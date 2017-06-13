import React from "react";

export default class HueRotate extends React.Component {
  get defaultValue () {
    return 0;
  }
  
  onRadiusChange (e) {
    this.props.onFilterChange({
        filterType: "hue-rotate",
        value: `${e.target.value === "" ? this.defaultValue : e.target.value}deg`
    });
  }

  parseRadius () {
    return parseInt(this.props.filterData.value === "" ? this.defaultValue : this.props.filterData.value);
  }

  render() {
    return (
      <section>
        {/*todo: some kind of radial input*/}
        <label>Angle, deg:</label> <input type="number" min="0" max="360" value={this.parseRadius()} onChange={this.onRadiusChange.bind(this)}/>
      </section>
    );
  }
}