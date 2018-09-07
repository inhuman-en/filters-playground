import React from "react";
import ReactDOM from "react-dom";

import filterStore from "./filterStore";
import Root from "./components/Root";

import "../sass/skeleton.scss";
import "../sass/main.scss";
import IconLibrary from "./Iconlibrary";

IconLibrary.register();

window.onload = function () {
    ReactDOM.render(
       <Root store={filterStore} />,
        document.getElementById('app')
    );
}