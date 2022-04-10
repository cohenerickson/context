import StyleOptions from "./interfaces/StyleOptions";

const Options: StyleOptions = {
  light: {
    background: "#FFFFFF",
    text: "#1c1c1c",
    cmd: "#828481",
    border: "#e3e5e8",
    shadow: "0 5px 10px 0 rgba(0, 0, 0, 0.2), 0 5px 10px 0 rgba(0, 0, 0, 0.2)",
    hover: {
      background: "#E8E8E9",
      text: "",
      cmd: "#1c1c1c"
    }
  },
  dark: {
    background: "#292A2D",
    text: "#e6e6e6",
    cmd: "#828481",
    border: "#373a3d",
    shadow: "0 5px 10px 0 rgba(0, 0, 0, 0.2), 0 5px 10px 0 rgba(0, 0, 0, 0.2)",
    hover: {
      background: "#3F4042",
      text: "",
      cmd: "#e6e6e6"
    }
  }
}

function genCSS (id: number, options: StyleOptions) {
  Object.assign(options, Options);
  return {
    internal: `
      :root {
        --bg: ${options.light.background};
        --bg-hover: ${options.light.hover.background};
        --text: ${options.light.text};
        --text-hover: ${options.light.hover.text};
        --cmd: ${options.light.cmd};
        --cmd-hover: ${options.light.hover.cmd};
        --border: ${options.light.border};
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --bg: ${options.dark.background};
          --bg-hover: ${options.dark.hover.background};
          --text: ${options.dark.text};
          --text-hover: ${options.dark.hover.text};
          --cmd: ${options.dark.cmd};
          --cmd-hover: ${options.dark.hover.cmd};
          --border: ${options.dark.border};
        }
      }

      body {
        margin: 0;
        background: var(--bg);
      }

      .menu {
 	      background: var(--bg);
        position: fixed;
        font-family: sans-serif;
        padding: 10px 0 10px 0;
        width: 250px;
        user-select: none;
      }

      .menu .button {
        font-size: 12px;
        padding: 4px 15px 4px 15px;
        width: 250px;
      }

      .menu .button td {
        padding: 0;
      }

      .menu .button .text {
        color: var(--text);
        text-align: left;
      }

      .menu .button .cmd {
        color: var(--cmd);
        text-align: right;
      }

      ${options.light.hover.background ||
        options.light.hover.background ?
        `
        .menu .button:hover {
          background: var(--bg-hover);
        }
        ` : ``
      }

      ${options.light.hover.text ||
        options.light.hover.text ?
        `
        .menu .button:hover .text {
          color: var(--text-hover);
        }
        ` : ``
      }

      ${options.light.hover.cmd ||
        options.light.hover.cmd ?
        `
        .menu .button:hover .cmd {
          color: var(--cmd-hover);
        }
        ` : ``
      }

      .separator {
        border: 0;
        border-bottom: 1px solid var(--border);
        margin: 5px 0 5px 0;
      }
    `.replace(/(  |\n)/g, ""),

    
    external: `
      :root {
        --shadow: ${options.light.shadow};
      }

      @media (prefers-color-scheme: dark) {
        :root {
          --shadow: ${options.dark.shadow};
        }
      }

      #__context-menu_${id}__ {
        box-shadow: var(--shadow);
        border: 0;
        position: fixed;
        border-radius: 10px;
      }

      .__context-menu_hidden__ {
        display: none;
      }
    `.replace(/(  |\n)/g, "")
  };
}

export default genCSS;