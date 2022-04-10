import ButtonOptions from "./lib/interfaces/ButtonOptions";

class Button {
  constructor (options: ButtonOptions) {  
    this.id = Math.ceil(Math.random()*100000);
  }
}

export default Button;