import React from "react";
import ReactDOM from "react-dom/client";
import "src/assets/scss/global.scss";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(
  "Mgo+DSMBaFt/QHRqVVhjVFpFdEBBXHxAd1p/VWJYdVt5flBPcDwsT3RfQF5jSH5SdkNmWnpfeXBURQ==;Mgo+DSMBPh8sVXJ0S0J+XE9HflRDX3xKf0x/TGpQb19xflBPallYVBYiSV9jS31Td0ViWXlbc3FUT2VVUg==;ORg4AjUWIQA/Gnt2VVhkQlFadVdJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxQdkRjWH9YdXdQRGBeVkc=;ODUxNDUzQDMyMzAyZTM0MmUzMGFGVEdsQksrdVZGR3FkWkRUa255V3U4QUN2M2hIYWtDeEdZWE9wOUQ5R3M9;ODUxNDU0QDMyMzAyZTM0MmUzMGJPYnkwOXArcExpVlBic3J0SmNWR0I4VVkwTzR4YnExU3A1OXVWdU9vL2c9;NRAiBiAaIQQuGjN/V0Z+WE9EaFxKVmJLYVB3WmpQdldgdVRMZVVbQX9PIiBoS35RdUViWX5ednFWQ2JdUUN1;ODUxNDU2QDMyMzAyZTM0MmUzMENIMis3a1AxZG8vK0J3OFRmYjZ0ZjNCai9lOVdPUkJ6akp4Yy9FWnpwQjA9;ODUxNDU3QDMyMzAyZTM0MmUzME53dlBVWUMzUC9adlBWclR2TXA4aWppOUE3ZHBiR2o4QVlXMEh1L3RER009;Mgo+DSMBMAY9C3t2VVhkQlFadVdJXGFWfVJpTGpQdk5xdV9DaVZUTWY/P1ZhSXxQdkRjWH9YdXdQRGFUVUc=;ODUxNDU5QDMyMzAyZTM0MmUzMEJrdFZFRGo5TWFwbElaOUtDVWpZYldmNGdpbkh4QWMyVXFTN0N6bFJZR0U9;ODUxNDYwQDMyMzAyZTM0MmUzMG1qWk9SejBjaExwU2N5OTZCWTliUjVieEZYNmZZbExIRHEwOGdkd1RmdEk9;ODUxNDYxQDMyMzAyZTM0MmUzMENIMis3a1AxZG8vK0J3OFRmYjZ0ZjNCai9lOVdPUkJ6akp4Yy9FWnpwQjA9"
);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
