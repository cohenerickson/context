import { Context, Button } from "./index";

window.menu = new Context({});

menu.addButton(new Button({
  text: "Alert",
  cmd: "Shift+R",
  run: alert,
  listen: true
}));

menu.addSep();

menu.addButton(new Button({
  text: "Console Log",
  cmd: "Shift+C",
  run: log,
  listen: false
}));

function alert (trigger: MouseEvent | KeyboardEvent) {
  if (trigger.type === "click") window.alert("Button Pressed");
  else window.alert("Command Run");
}

function log (trigger: MouseEvent | KeyboardEvent) {
  if (trigger.type === "click") console.log("Button Pressed");
  else console.log("Command Run");
}