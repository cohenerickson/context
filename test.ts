import { Context, Button } from "./index";

let menu = new Context();

menu.addButton(new Button({
  text: "Alert",
  run: (event, target) => {
    alert();
  }
}));