import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer, Flip } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<Provider store={store}>
		<App />
		<ToastContainer
			theme="colored"
			pauseOnHover={false}
			pauseOnFocusLoss={false}
			transition={Flip}
			autoClose={3500}
		/>
	</Provider>
);

// Hello World
console.log("%c<Mini Music Player - ANGHIADX />", "font-weight: bold; color: red; font-size: 14px");

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
