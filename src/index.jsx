import React from "react";
import ReactDOM from "react-dom";

import Editor from './Editor';
import createSchema from './demo-schema';

import './style.scss';

function App() {
  return (
    <Editor schema={createSchema()}/>
  )
}

ReactDOM.render(<App/>, document.getElementById("app"));
