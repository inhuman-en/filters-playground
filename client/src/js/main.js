import React from "react";
import ReactDOM from "react-dom";

import filterStore from "./filterStore";
import Root from "./components/Root";

import "../sass/main.scss";

window.onload = function () {
    ReactDOM.render(
       <Root store={filterStore} />,
        document.getElementById('app')
    );
}