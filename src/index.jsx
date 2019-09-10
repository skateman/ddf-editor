import React from "react";
import ReactDOM from "react-dom";
import Editor from './Editor';
import createSchema from './schema';

function App() {
  return (
    <Editor schema={createSchema()}/>
  )
}

ReactDOM.render(<App/>, document.getElementById("app"));
