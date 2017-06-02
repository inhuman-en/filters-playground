import React from "react";
import { connect } from "react-redux";

import UploadForm from "../UploadForm";
import { uploadUrlFilter } from "../../actions";

const mapStateToProps = (state) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFormSubmit: (formData) => {
            console.log(formData.get("img"));
            dispatch(uploadUrlFilter(formData));
        }
    }
}


class SVGUrl extends React.Component {

  get defaultElementId () {
    return "";
  }

  get defaultFileUrl () {
    return "";
  }

  get defaultCSSString () {
    return this.buildCSSString({
      fileUrl: this.defaultFileUrl,
      elementId: this.defaultElementId
    });
  }

  buildCSSString (values) {
    return `${values.fileUrl}#${values.elementId}`;
  }

  onElementIdChange (e) {
    let value = e.target.value === "" ? this.defaultElementId : e.target.value,
        allValues = this.parseValues();

    allValues.elementId = value;

    this.handleChange(allValues);
  }

  handleChange (values) {
    this.props.onFilterChange({
        filterType: "url",
        value: this.buildCSSString(values)
    });
  }

  parseValues () {
    let cssString = this.props.filterData.value === "" ?
          this.defaultCSSString :
          this.props.filterData.value,
        parsed = cssString.split("#");

    return {
      fileUrl: parsed[0],
      elementId: parsed[1]
    };
  }

  logValue (e) {
    console.log(e);
  }

  render() {
    let values = this.parseValues();

    return (
      <div>
        <div>
          {values.fileUrl || <span>Choose file:</span> }<UploadForm onFormSubmit={this.props.onFormSubmit}/>
        </div>
        <div>
          <span>Filter element Id:</span> <input type="text" value={values.elementId} onChange={this.onElementIdChange.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SVGUrl)