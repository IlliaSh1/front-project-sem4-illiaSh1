import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    body {
      background-color: var(--bg-color);
      color: var(--text-color);
    }
    /* html[data-theme=light] {
      --theme: white;
    } */

    :root {
      --primary-color: #126EF0;
      --primary-color_rgb: 11, 110, 240;
      --primary-active-color: #46a0ff;
      --secondary-color: orange; //#c9e790

      --text-color: black;
      --bg-color: white;
      --bg-secondary-color: #d8d8d8;


      --text-danger-color: #eb0000;

      --text-inactive-color: #888;
      --border-inactive-color: #d9d9d9;
      --bg-inactive-color: rgba(0, 0, 0, 0.05);
    }
    html[data-theme=dark] {
      --primary-color: #90b3e7;
      --primary-active-color: #65affe;

      --text-color: white;
      --bg-color: #111;
      --bg-secondary-color: #333;

      --text-danger-color: #ff5050;

      --text-inactive-color: #ddd;
      --border-inactive-color: #888;
      --bg-inactive-color: rgba(255, 255, 255, 0.2);
    }
`;

export default GlobalStyles;
