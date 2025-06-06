import { createGlobalStyle } from "styled-components";

export const GlobalStyles= createGlobalStyle`
    * {
    box-sizing: border-box;
    }

    body {
    margin: 0;
    padding: 20px 40px;
    font-family: 'Open Sans',
        sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    }

    code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }

    a {
    text-decoration: none;
    color: black;
    }
`