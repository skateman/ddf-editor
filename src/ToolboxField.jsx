import React from "react";
import { useDrag } from 'react-dnd';
import classSet from 'react-classset';

const ToolboxField = ({dispatch, kind, title, icon}) => {
  const itemType = 'input';

  const [, drag, preview] = useDrag({
    item: { type: 'input', kind },
    begin: () => {
      setTimeout(() => dispatch({type: 'dragStart', itemType}));
    },
    end: (_, monitor) => {
      if (!monitor.didDrop()) {
        return dispatch({type: 'dragEnd'});
      }

      const { name:target, position } = monitor.getDropResult();

      dispatch({
        type: 'dropNew',
        kind,
        title,
        target,
        position
      });
    }
  });

  return (
    <div className="toolbox-field-inner" ref={drag}>
      <div className="icon" ref={preview}>
        <i className={classSet(icon, 'fa-fw')}></i>
      </div>
      <div className="title">
        { title }
      </div>
    </div>
  )
}

export default ToolboxField;
