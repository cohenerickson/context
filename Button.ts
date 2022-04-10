import u from "./lib/umbrella";

import ButtonOptions from "./lib/interfaces/ButtonOptions";

const Options = {
  text: "Button",
  run: ()=>{},
  cmd: "",
  criteria: ()=>{return true}
}

class Button {
  constructor (options: ButtonOptions) {
    this.options = options ?? Options;
    this.options.text = this.options.text ?? Options.text;
    this.options.run = this.options.run ?? Options.run;
    this.options.cmd = this.options.cmd ?? Options.cmd;
    this.options.criteria = this.options.criteria ?? Options.criteria;
    this.id = Math.ceil(Math.random()*100000);
  }

  elm (target: Event) {
    let elm = u("<table>").attr("id", this.id);

    elm.append(u("<td>").addClass("text").text(this.options.text));
    if (this.options.cmd) elm.append(u("<td>").addClass("text").text(this.options.cmd));

    if (this.options.click) {
      elm.on("click", (click) => {
        this.options.click(click, target);
      });
    }

    return elm;
  }
}

export default Button;