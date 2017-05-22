import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";

import "../sass/main.scss";

import Root from "./components/Root";
import reducer from "./reducer";

window.onload = function () {

    let store = createStore(reducer);

    ReactDOM.render(
       <Root store={store} />,
        document.getElementById('app')
    );
}