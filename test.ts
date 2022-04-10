import { Context, Button } from "./index";

window.menu = new Context({});

menu.addButton(new Button({
  text: "Alert",
  run: (event, target) => {
    alert();
  }
}));