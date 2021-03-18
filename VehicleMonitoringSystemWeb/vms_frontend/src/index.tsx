import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./App";
import registerServiceWorker from "./registerServiceWorker";
import {configureAxios} from "./api";
import "./index.css";

registerServiceWorker();
configureAxios();
ReactDOM.render(<App />, document.getElementById("root"));
