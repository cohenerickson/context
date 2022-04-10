import u from "./lib/umbrella";

import Context from "./Context";

import ButtonOptions from "./lib/interfaces/ButtonOptions";

const Options = {
  text: "Button",
  run: ()=>{},
  cmd: "",
  criteria: ()=>{return true}
}

class Button {
  options;
  id;
  
  constructor (options: ButtonOptions) {
    this.options = options ?? Options;
    this.options.text = this.options.text ?? Options.text;
    this.options.run = this.options.run ?? Options.run;
    this.options.cmd = this.options.cmd ?? Options.cmd;
    this.options.criteria = this.options.criteria ?? Options.criteria;
    this.id = Math.ceil(Math.random()*100000);
  }

  elm (target: MouseEvent, context: Context) {
    let elm = u("<table>").attr("id", this.id).addClass("button");

    elm.append(u("<td>").addClass("text").text(this.options.text));
    if (this.options.cmd) elm.append(u("<td>").addClass("text").text(this.options.cmd));

    if (this.options.run) {
      elm.on("click", (click: MouseEvent) => {
        this.options.run(click, target);
        context.close(click);
      });
      elm.on("contextmenu", (click: MouseEvent) => {
        this.options.run(click, target);
        context.close(click);
      });
    }

    return elm;
  }
}

export default Button;