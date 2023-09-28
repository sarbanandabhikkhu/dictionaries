import dictionaries from "./lib/dictionaries.js";
import longPress from "./utils/longPress.js";

dictionaries.init();

document.addEventListener("click", (e) => {
  longPress(e.target, (t) => console.log(t.tagName));
});
