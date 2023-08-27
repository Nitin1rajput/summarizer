import { render } from "react-dom";
import SelectionOverlay from "../components/SelectionOverlay";

class MyElement extends HTMLElement {
  shadow;
  constructor() {
    // Always call super first in constructor
    super();

    this.shadow = this.attachShadow({ mode: "open" });
    // Write element functionality in here
    this.renderElement();
  }

  renderElement() {
    render(<SelectionOverlay />, this.shadow);
  }
}

export default MyElement;
