import React from "react";
import ReactDOM from "react-dom";
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import TouchBackend from 'react-dnd-touch-backend';
import Editor from './Editor';
import createSchema from './schema';

import './style.scss';

function App() {
  const touch = 'ontouchstart' in document.documentElement;

  return (
    <DndProvider backend={touch ? TouchBackend : HTML5Backend}>
      <Editor schema={createSchema()}/>
    </DndProvider>
  )
}

ReactDOM.render(<App/>, document.getElementById("app"));
