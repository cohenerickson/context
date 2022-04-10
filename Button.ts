import u from "./lib/umbrella";

import Context from "./Context";

import ButtonOptions from "./lib/interfaces/ButtonOptions";

const Options: ButtonOptions = {
  text: "Button",
  run: ()=>{},
  cmd: "",
  criteria: ()=>{return true},
  listen: false
}

class Button {
  options;
  id;
  
  constructor (options: ButtonOptions) {
    // default options
    this.options = options || Options;
    this.options.text = this.options.text || Options.text;
    this.options.run = this.options.run || Options.run;
    this.options.cmd = this.options.cmd || Options.cmd;
    this.options.criteria = this.options.criteria || Options.criteria;
    this.options.listen = this.options.listen || Options.listen;
    
    // assign random id
    this.id = Math.ceil(Math.random()*100000);

    // cmd listener
    if (this.options.listen && this.options.cmd) {
      let command = this.options.cmd.replace(/ /, "").toLowerCase().split("+");
      u("html").on("keydown", (event) => {
        // check isTrusted
        if (!event.isTrusted) return;

        let cmd = command;
                
        // check special keys
        if (!!cmd.filter(x=>x.match(/^(ctrl|control)$/g)).length) {
          cmd = cmd.filter(x=>!x.match(/^(ctrl|control)$/g));
          if (!event.ctrlKey) return;
        } else {
          if (event.ctrlKey) return;
        }

        if (!!cmd.filter(x=>x.match(/^(alt)$/g)).length) {
          cmd = cmd.filter(x=>!x.match(/^(alt)$/g));
          if (!event.altKey) return;
        } else {
          if (event.altKey) return;
        }

        if (!!cmd.filter(x=>x.match(/^(shift)$/g)).length) {
          cmd = cmd.filter(x=>!x.match(/^(shift)$/g));
          if (!event.shiftKey) return;
        } else {
          if (event.shiftKey) return;
        }

        if (!!cmd.filter(x=>x.match(/^(win|windows|cmd|command)$/g)).length) {
          cmd = cmd.filter(x=>!x.match(/^(win|windows|cmd|command)$/g));
          if (!event.metaKey) return;
        } else {
          if (event.metaKey) return;
        }

        // check key
        if (cmd.indexOf(event.key.toLowerCase())>=0 || cmd.indexOf(event.code.toLowerCase())>=0) {
          event.preventDefault();
          this.options.run(event);
        }
      });
    }
  }

  elm (target: MouseEvent, context: Context) {
    let elm = u("<table>").attr("id", this.id).addClass("button");

    elm.append(u("<td>").addClass("text").text(this.options.text));
    if (this.options.cmd) elm.append(u("<td>").addClass("cmd").text(this.options.cmd));

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