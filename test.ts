import { Context, Button } from "./index";

window.menu = new Context({});

menu.addButton(new Button({
  text: "Alert",
  run: (event: MouseEvent, target: MouseEvent) => {
    alert();
  }
}));

menu.addButton(new Button({
  text: "Console Log",
  run: (event: MouseEvent, target: MouseEvent) => {
    console.log("Button Pressed!");
  }
}));