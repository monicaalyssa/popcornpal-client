import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view";
import "./index.scss";
import { BrowserRouter as Router } from "react-router-dom";

const PopcornPalApplication = () => {

  return (
  <Router>
      <MainView />
  </Router>
  )
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<PopcornPalApplication />);
