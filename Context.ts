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
    this.menu = u("<iframe>").attr("id", `__context-menu_${this.id}__`).addClass("__context-menu_hidden__");
    u("body").append(this.menu);
    // css
    let css = genCSS(this.id, options.style || {});
    this.style = u("<style>").html(css.internal);
    u(this.menu.first().contentDocument.head).append(this.style);
    u("head").append(u("<style>").html(css.external));
    // events
    u("html").on("click", (target: MouseEvent) => {
      target.preventDefault();
      this.close(target);
    });
    u(this.menu.first().contentDocument).on("click", (target: MouseEvent) => {
      target.preventDefault();
      this.close(target);
    });
    u(this.menu.first().contentDocument).on("contextmenu", (target: MouseEvent) => {
      target.preventDefault();
      this.close(target);
    });
    u("html").on("contextmenu", (target: MouseEvent) => {
      target.preventDefault();
      this.close(target);
      this.open(target);
    });
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

  addSeparator () {
    this.buttons.push("SEP");
  }

  addSep () {
    this.addSeparator();
  }

  open (target: MouseEvent) {
    // add buttons
    this.menu.removeClass("__context-menu_hidden__");
    u(this.menu.first().contentDocument.body).append(u("<div>").addClass("menu"));
    let btns = [];
    this.buttons.forEach((btn: Button|string) => {
      if (btn === "SEP") {
        let sep = u("<div>").addClass("separator");
        u(this.menu.first().contentDocument.body).find(".menu").append(sep);
      } else {
        let criteria = btn.options.criteria(target);
        if (criteria) {
          btns.push(btn);
          u(this.menu.first().contentDocument.body).find(".menu").append(btn.elm(target, this));
        }
      }
    });
    if (!btns.length) return this.close(target);
    // update position and size
    let x = target.clientX;
    let y = target.clientY;
    let width = u(this.menu.first().contentDocument.body).find(".menu").first().offsetWidth;
    let height = u(this.menu.first().contentDocument.body).find(".menu").first().offsetHeight;
    if (x > window.innerWidth - width) x -= width;
    if (y > window.innerHeight - height) y -= height;
    this.menu.first().style.left = x + "px";
    this.menu.first().style.top = y + "px";
    this.menu.first().style.width = width + "px";
    this.menu.first().style.height = height + "px";
  }

  close (target: MouseEvent) {
    this.menu.addClass("__context-menu_hidden__");
    u(this.menu.first().contentDocument.body).html("");
  }
}

export default Context;