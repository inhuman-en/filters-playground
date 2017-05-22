import React from "react";

/*
<offset-x> <offset-y> (required)
<blur-radius> (optional)
<spread-radius> (optional) !! Per Docs: Chrome, Safari and Opera, and maybe other browsers, do not support this 4th length; it will not render if added.

<color> (optional)
 */
export default class DropShadow extends React.Component {

  get defaultOffsetX () {
    return 0;
  }

  get defaultOffsetY () {
    return 0;
  }

  get defaultBlurRadius () {
    return 0;
  }

  get defaultColor () {
    return "#000000";
  }

  get defaultCSSString () {
    return this.buildCSSString({
      offsetX: this.defaultOffsetX,
      offsetY: this.defaultOffsetY,
      blurRadius: this.defaultBlurRadius,
      spreadRadius: this.defaultSpreadRadius,
      color: this.defaultColor,
    });
  }

  onOffsetXChange (e) {
    let value = e.target.value === "" ? this.defaultOffsetX : e.target.value,
        allValues = this.parseValues();

    allValues.offsetX = value;

    this.handleChange(allValues);
  }

  onOffsetYChange (e) {
    let value = e.target.value === "" ? this.defaultOffsetY : e.target.value,
        allValues = this.parseValues();

    allValues.offsetY = value;

    this.handleChange(allValues);
  }

  onBlurRadiusChange (e) {
    let value = e.target.value === "" ? this.defaultBlurRadius : e.target.value,
        allValues = this.parseValues();

    allValues.blurRadius = value;

    this.handleChange(allValues);
  }

  onColorChange (e) {
    let value = e.target.value === "" ? this.defaultColor : e.target.value,
        allValues = this.parseValues();

    allValues.color = value;

    this.handleChange(allValues);
  }

  handleChange (values) {
    this.props.onFilterChange({
        filterType: "drop-shadow",
        value: this.buildCSSString(values)
    });
  }

  buildCSSString (values) {
    return `${values.offsetX}px ${values.offsetY}px ${values.blurRadius}px ${values.color}`;
  }

  parseValues () {
    let cssString = this.props.filterData.value === "" ?
          this.defaultCSSString :
          this.props.filterData.value,
        parsed = cssString.split(" ");

    return {
      offsetX: parseInt(parsed[0]),
      offsetY: parseInt(parsed[1]),
      blurRadius: parseInt(parsed[2]),
      color: parsed[3],
    };
  }

  render() {
    let values = this.parseValues();
    return (
      <div>
        <div>
          <span>Offset X, px:</span> <input type="number" min="0" value={values.offsetX} onChange={this.onOffsetXChange.bind(this)}/>
        </div>
        <div>
          <span>OffsetY, px:</span> <input type="number" min="0" value={values.offsetY} onChange={this.onOffsetYChange.bind(this)}/>
        </div>
        <div>
          <span>Blur radius, px:</span> <input type="number" min="0" value="0" value={values.blurRadius} onChange={this.onBlurRadiusChange.bind(this)}/>
        </div>
        <div>
          <span>Color:</span> <input type="color" value={values.color} onChange={this.onColorChange.bind(this)}/>
        </div>
      </div>
    );
  }
}