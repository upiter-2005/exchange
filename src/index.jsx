import ReactDOM from "react-dom/client";
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App";
import { store } from "./redux/store";
import "./firebase";

const providerConfig = {
  domain: "dev-21g073qk.us.auth0.com",
  clientId: "rUlzQsqDxTVmICqpfuvyGiLfqJJao08i",
  redirectUri: window.location.origin,
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider {...providerConfig}>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Auth0Provider>
);
