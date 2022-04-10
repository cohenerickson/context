import u from "./lib/umbrella";
import genCSS from "./lib/genCSS";

import Button from "./Button";

import ContextOptions from "./lib/interfaces/ContextOptions";

class Context {
  id;
  menu;
  buttons;
  style;
  
  constructor (options: ContextOptions) {
    this.id = Math.ceil(Math.random()*100000);
    this.buttons = [];
    // iframe
    this.menu = u("<iframe>").attr("id", `__context-menu_${this.id}__`);
    u("body").append(this.menu);
    // css
    let css = genCSS(this.id, options.style || {});
    this.style = u("<style>").html(css.internal);
    u(this.menu.first().contentDocument.head).append(this.style);
    u("head").append(u("<style>").html(css.external));
    // events
    u("html").on("click", (target: Event) => this.close(target));
    u("html").on("contextmenu", (target: Event) => this.open(target));
  }

  addButton (button: Button) {
    this.buttons.push(button);
  }

  removeButton (button: Button) {
    this.buttons = this.buttons.filter(x=>x.id!==button.id);
  }

  getButton (id) {
    return this.buttons.find(x=>x.id===id);
  }

  open (target: Event) {
    this.buttons.forEach((btn: Button) => {
      let criteria = btn.options.criteria(target);
      if (criteria) {
        u(this.menu.first().contentDocument.body).append(btn.elm(target));
      }
    });
  }

  close (target: Event) {
    u(this.menu.first().contentDocument.body).html("");
  }
}

export default Context;