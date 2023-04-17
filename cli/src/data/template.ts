// vanilla html file content
export const VANILLA_HTML_CONTENT = `
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{{projectName}}</title>
        {{styling_logic}}
    </head>
    <body>
        {{vanilla_markup_content}}
        {{script_tag}}
    </body>
</html>
`;

export const VANILLA_CSS_CONTENT = `

:root {
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;
  
    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;
  
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }
  
  a {
    font-weight: 500;
    color: #646cff;
    text-decoration: inherit;
  }
  a:hover {
    color: #535bf2;
  }
  
  body {
    margin: 0;
    display: flex;
    align-items: center;
    justify-content:center;
    text-align: center;
    min-width: 320px;
    min-height: 100vh;
  }
  
  h1 {
    font-size: 3.2em;
    line-height: 1.1;
  }
  
  #app {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
  }
  
  button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
  }
  button:hover {
    border-color: #646cff;
  }
  button:focus,
  button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
  
  @media (prefers-color-scheme: light) {
    :root {
      color: #213547;
      background-color: #ffffff;
    }
    a:hover {
      color: #747bff;
    }
    button {
      background-color: #f9f9f9;
    }
  }
  

`;

// React file content (Javascript support)

export const REACT_INDEX_CSS = VANILLA_CSS_CONTENT;

export const REACT_MAIN_JSX = `
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
{{style_module}}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
`;

export const REACT_APP_JSX = `
import { useState } from 'react'
{{styling}}
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      {{markup_content}}
    </div>
  )
}

export default App
`;

export const REACT_INDEX_HTML = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{title}}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="{{script_link}}"></script>
  </body>
</html>
`;

export const APP_SVELTE = `
<script>
  import Counter from './lib/Counter.svelte'
</script>

<main>
  {{markup}}
</main>
`;

export const COUNTER_SVELTE = `
<script>
  let count = 0
  const increment = () => {
    count += 1
  }
</script>

<button {{styling}} on:click={increment}>
  count is {count}
</button>
`;

export const SVELTE_INDEX_HTML = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{title}}</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="{{script_link}}"></script>
  </body>
</html>
`;

export const NEXT_INDEX_JS = `
import { useState } from 'react'
{{styling}}

function Home() {
  const [count, setCount] = useState(0)

  return (
    <div className={{container_style}}>
      {{markup_content}}
    </div>
  )
}

export default Home;
`;
