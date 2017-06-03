import React from 'react';
import { connect } from "react-redux";
import { uploadFilterable } from "../actions";

import UploadForm from "./UploadForm";

const mapFiltersTostyle = (filters) => {
    return filters.map(f => `${f.filterType}(${f.value})`)
        .join(" ");
}

const mapStateToProps = (state) => {
  return {
    cssFilter: mapFiltersTostyle(state.activeFilters),
    imageSrc: state.filterable.imageSrc
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFormSubmit: (formData) => {
            console.log(formData.get("img"));
            dispatch(uploadFilterable(formData));
        }
    }
}

class Filterable extends React.Component { 
    render() {
        let imageSrc = this.props.imageSrc;

        return (
            <section class="filterable">
                {/*todo: media-based img size*/}
                {imageSrc ? 
                <img style={{filter: this.props.cssFilter}} width="500" src={imageSrc} alt="Filter me!"/> : ""}
                <UploadForm onFormSubmit={this.props.onFormSubmit}/>
            </section>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Filterable)