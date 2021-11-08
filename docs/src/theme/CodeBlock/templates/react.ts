const WrapperCode = `import React, { useState } from "react";
import App from "./App";
import { connect, disconnect, store } from "./store"; // the store we defined above
import { useReactive } from "@reactivedata/react";

export default function Wrapper() {
  const [inspecting, setInspecting] = useState(false);
  const state = useReactive(store)
  return (
    <div>
      <div
        style={{
          borderBottom: "1px solid #e4e7eb",
          padding: "5px",
          background: "#f8f9fb"
        }}
      >
        <label>
          <input type="radio" name="sync" defaultChecked onChange={connect} />{" "}
          Online (enable sync)
        </label>
        <label>
          <input type="radio" name="sync" onChange={disconnect} /> Offline
          (disable sync)
        </label>
        { inspecting && <button onClick={() => setInspecting(false)} style={{float: "right"}}>Back</button> }
        { !inspecting && <button onClick={() => setInspecting(true)} style={{float: "right"}}>Inspect</button> }
      </div>
      <div className="wrapper">
        { inspecting ? <pre>{JSON.stringify(state, undefined, 2)}</pre> : <App /> }
      </div>
    </div>
  );
}
`;

export const REACT_TEMPLATE = {
  files: {
    "/App.tsx": {
      code: `import React from "react";
      
export default function App() {
    return <h1>Hello World</h1>
  }
  `,
    },
    "/Wrapper.tsx": {
      hidden: true,
      code: WrapperCode,
    },
    "/index.tsx": {
      hidden: true,
      code: `import React, { StrictMode } from "react";
  import ReactDOM from "react-dom";
  import "./styles.css";
  
  import Wrapper from "./Wrapper";
  
  const rootElement = document.getElementById("root");
  ReactDOM.render(
    <StrictMode>
      <Wrapper />
    </StrictMode>,
    rootElement
  );`,
    },
    "/styles.css": {
      hidden: true,
      code: `body {
    font-family: arial;
    color: rgb(117, 118, 120);
    -webkit-font-smoothing: auto;
    -moz-font-smoothing: auto;
    -moz-osx-font-smoothing: grayscale;
    font-smoothing: auto;
    text-rendering: optimizeLegibility;
    font-smooth: always;
    -webkit-tap-highlight-color: transparent;
    -webkit-touch-callout: none;
    padding:0;
    margin:0;
  }
  
  h1 {
    font-size: 1.5rem;
  }
  
  .wrapper {
    margin:5px;
  }`,
    },
    "/public/index.html": {
      hidden: true,
      code: `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <div id="root"></div>
    </body>
  </html>`,
    },
  },
  dependencies: {
    react: "^17.0.0",
    "react-dom": "^17.0.0",
    "react-scripts": "^4.0.0",
  },
  entry: "/index.tsx",
  main: "/App.tsx",
  environment: "create-react-app-typescript",
};

// const AppCode = `import React from "react";
// import { useReactive } from "@reactivedata/react";
// import { store } from "./store"; // the store we defined above

// export default function App() {
//   const state = useReactive(store);

//   return (
//     <div>
//       <p>Todo items:</p>
//       <ul>
//         {state.todos.map((todo, i) => {
//           return (
//             <li key={i}
//               style={{ textDecoration: todo.completed ? "line-through" : ""}}
//               >
//                 <label>
//                   <input type="checkbox" checked={todo.completed} onClick={() => todo.completed = !todo.completed} />
//                   {todo.text}
//                 </label>
//             </li>);
//         })}
//       </ul>
//       <input
//         placeholder="Enter a todo item and hit enter"
//         type="text"
//         onKeyPress={(event) => {
//           if (event.key === "Enter") {
//             const target = event.target as HTMLInputElement;
//             // Add a todo item using the text added in the textfield
//             state.todos.push({ completed: false, text: target.value });
//             target.value = "";
//           }
//         }}
//         style={{width:"200px", maxWidth:"100%"}}
//       />
//     </div>
//   );
// }`;
