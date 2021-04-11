import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./app";
import registerServiceWorker from "./registerServiceWorker";
import {configureAxios} from "./api";
import "./styles/app.scss";

registerServiceWorker();
configureAxios();
ReactDOM.render(<App />, document.getElementById("root"));
