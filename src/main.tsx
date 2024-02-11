import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { BrowserRouter } from "react-router-dom";

import Routes from "./routes";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <RecoilRoot>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </RecoilRoot>
  // </React.StrictMode>
);
