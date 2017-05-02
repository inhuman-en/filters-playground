import React from "react";
import { Link, Route } from "react-router";

import NoFilter from "./NoFilter";
import FilterMenu from "./FilterMenu";
import Filterable from "./Filterable";

export default class Layout extends React.Component {
    constructor() {
        super();
        this.state = {
            filterList: this.getFilterList()
        };
    }

    getFilterList () {

        return [
            {
                displayName: "Blur",
                filterFn: "blur",
                component: "Blur"
            },
            {
                displayName: "Brightness",
                filterFn: "brightness",
                component: "Brightness"
            },
            {
                displayName: "Contrast",
                filterFn: "contrast",
                component: "Contrast"
            },
            {
                displayName: "Drop shadow",
                filterFn: "drop-shadow",
                component: "DropShadow"
            },
            {
                displayName: "Grayscale",
                filterFn: "grayscale",
                component: "Grayscale"
            },
            {
                displayName: "Hue rotate",
                filterFn: "hue-rotate",
                component: "HueRotate"
            },
            {
                displayName: "Invert",
                filterFn: "invert",
                component: "Invert"
            },

            {
                displayName: "Opacity",
                filterFn: "opacity",
                component: "Opacity"
            },
            {
                displayName: "Saturate",
                filterFn: "saturate",
                component: "Saturate"
            },
            {
                displayName: "SVG",
                filterFn: "url",
                component: "SVGUrl"
            }
        ]
    }

    render() {
        const {location} = this.props;

        return (
            <main>
                <Filterable></Filterable>
                <FilterMenu filterList={this.state.filterList} location={ location }></FilterMenu>
                {this.props.children}
            </main>
            );
    }
}