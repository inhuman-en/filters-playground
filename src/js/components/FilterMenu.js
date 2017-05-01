import React from 'react';
import { Link } from "react-router";

export default class FilterMenu extends React.Component {
    constructor() {
        super();
    }

    render() {
        return (
            <section className="filters">
                    <ul>
                        <li>
                            <Link to="f/filter1">filter1</Link>
                        </li>
                        <li>
                            <Link to="f/filter2">filter2</Link>
                        </li>
                        <li>
                            <Link to="f/filter3">filter3</Link>
                        </li>
                        <li>
                            <Link to="f/filter4">filter4</Link>
                        </li>
                        <li>
                            <Link to="f/filter5">filter5</Link>
                        </li>
                    </ul>
                </section>
        );
    }
}