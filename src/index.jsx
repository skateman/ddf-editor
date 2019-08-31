import React from "react";
import ReactDOM from "react-dom";
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Renderer from './renderer';
import createSchema from './schema';

import './style.scss';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <Renderer schema={createSchema()}/>
    </DndProvider>
  )
}

ReactDOM.render(<App/>, document.getElementById("app"));
