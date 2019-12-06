import React from 'react';
import { TabPane } from 'patternfly-react';
import classNames from 'classnames';

import { DropZone, itemTypes } from '../src';

const EditableTabContent = ({ name, fields, formOptions, dispatch }) => {
  const [{ isOver:isOverEmpty }, dropEmpty] = DropZone({ name, type: itemTypes.SECTION }, 'child');

  return (
    <TabPane key={ name } eventKey={ name } >
      { formOptions.renderForm(fields, formOptions) }
      { fields.length === 0 &&
        <div className={classNames({'empty': true, 'over': isOverEmpty})} ref={dropEmpty}></div>
      }
      <div className="section-wrapper">
        <div className="item new-section" onClick={() => dispatch({type: 'newSection', target: name})}>
          <i className="fa fa-plus"></i> New section
        </div>
      </div>
    </TabPane>
  )
};

export default EditableTabContent;
