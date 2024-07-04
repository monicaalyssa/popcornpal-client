import { createRoot } from "react-dom/client";

import "./index.scss";

const PopcornPalApplication = () => {
  return (
    <div className="popcorn-pal">
      <div>Good morning</div>
    </div>
  );
};

const container = document.querySelector("#root");
const root = createRoot(container);

root.render(<PopcornPalApplication />);