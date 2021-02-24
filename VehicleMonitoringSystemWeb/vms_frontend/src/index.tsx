import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./components/App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import {configureAxios} from "./api";

registerServiceWorker();
configureAxios();
ReactDOM.render(<App />, document.getElementById("root"));
