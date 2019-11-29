import React from "react";
import ReactDOM from "react-dom";

import Editor from './Editor';
import createSchema from './demo-schema';

import './style.scss';

function App() {
  return (
    <Editor initialSchema={createSchema()} onSubmit={() => undefined}/>
  )
}

ReactDOM.render(<App/>, document.getElementById("app"));
