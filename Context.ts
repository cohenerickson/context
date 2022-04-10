import genCSS from "./lib/genCSS";

import ContextOptions from "./lib/interfaces/ContextOptions";

class Context {
  constructor (options: ContextOptions) {
    this.id = Math.ceil(Math.random()*100000);
    // iframe
    this.menu = document.createElement("iframe");
    this.menu.id = `__context-menu_${this.id}__`;
    document.body.appendChild(this.menu);
    // css
    let css = genCSS(this.id, options.style || {});
    this.style = document.createElement("style");
    this.style.innerHTML = css.internal;
    this.menu.contentDocument.body.appendChild(this.style);
  }

  addButton (button) {
    this.buttons.push(button);
  }

  removeButton (button) {
    this.buttons = this.buttons.filter(x=>x.id!==button.id);
  }

  open () {
    
  }

  close () {
    
  }
}

export default Context;