import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles.css";
import App from "./App.jsx";

// Google Translate rewrites text nodes in place, which can leave React holding
// references to nodes whose parent has changed — crashing reconciliation with
// "removeChild"/"insertBefore" errors on route changes. Make those two Node
// methods no-op safely when the parent no longer matches. Standard workaround.
if (typeof Node === "function" && Node.prototype) {
  const realRemoveChild = Node.prototype.removeChild;
  Node.prototype.removeChild = function (child) {
    if (child.parentNode !== this) return child;
    return realRemoveChild.apply(this, arguments);
  };
  const realInsertBefore = Node.prototype.insertBefore;
  Node.prototype.insertBefore = function (newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode !== this) return newNode;
    return realInsertBefore.apply(this, arguments);
  };
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
