interface ButtonOptions {
  text: string,
  run: Function,
  cmd?: string,
  criteria?: Function,
  listen?: boolean
}

export default ButtonOptions;