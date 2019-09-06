import React from 'react';
import { TabPane } from 'patternfly-react';
import classSet from 'react-classset';

import { itemTypes } from './constants';
import { DropZone } from './DragAndDrop';

const DraggableTabContent = ({ name, fields, formOptions, dispatch }) => {
  const [{ isOver:isOverEmpty }, dropEmpty] = DropZone({ name, type: itemTypes.SECTION }, 'child');

  return (
    <TabPane key={ name } eventKey={ name } >
      { formOptions.renderForm(fields, formOptions) }
      { fields.length === 0 &&
        <div className={classSet({'empty': true, 'over': isOverEmpty})} ref={dropEmpty}></div>
      }
      <div className="section-wrapper">
        <div className="item new-section" onClick={() => dispatch({type: 'newSection', target: name})}>
          <i className="fa fa-plus"></i> New section
        </div>
      </div>
    </TabPane>
  )
};

export default DraggableTabContent;
