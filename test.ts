import { Context, Button } from "./index";

window.menu = new Context({});

menu.addButton(new Button({
  text: "Alert",
  run: (event, target) => {
    alert();
  }
}));

menu.addButton(new Button({
  text: "Console Log",
  run: (event, target) => {
    console.log("Button Pressed!");
  }
}));