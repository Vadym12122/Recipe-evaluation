import { StrictMode } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import App from "./App";

import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </StrictMode>
);
