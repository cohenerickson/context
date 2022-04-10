interface StyleOptions {
  light?: {
    background?: string,
    text?: string,
    cmd?: string,
    border?: string,
    shadow?: string,
    hover?: {
      background?: string,
      text?: string,
      cmd?: string
    }
  },
  dark?: {
    background?: string,
    text?: string,
    cmd?: string,
    border?: string,
    shadow?: string,
    hover?: {
      background?: string,
      text?: string,
      cmd?: string
    }
  }
}

export default StyleOptions;