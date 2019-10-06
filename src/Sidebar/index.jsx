import React, { useState, useEffect } from "react";
import { TabContainer, Nav, NavItem, TabContent, TabPane } from 'patternfly-react';
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/pf3-component-mapper';
import FormRender from '@data-driven-forms/react-form-renderer';

import Properties from './Properties';
import { dialogDetailsSchema } from '../constants';

const Sidebar = ({ schema, edit, dispatch }) => {
  const [activeTab, setActiveTab] = useState('dialog');

  useEffect(() => setActiveTab(edit ? 'properties' : 'dialog'), [edit]);

  return (
    <TabContainer id="dialog-properties-tabs" activeKey={activeTab} onSelect={tab => setActiveTab(tab)}>
      <div>
        <Nav bsClass="nav nav-tabs">
          <NavItem eventKey="dialog">Dialog</NavItem>
          <NavItem eventKey="schema">Schema</NavItem>
          <NavItem eventKey="properties" disabled={!edit}>Properties</NavItem>
        </Nav>
        <TabContent animation>
          <TabPane eventKey="dialog">
            <div className="form">
              <FormRender
                formFieldsMapper={formFieldsMapper}
                layoutMapper={layoutMapper}
                onSubmit={() => undefined}
                schema={dialogDetailsSchema}
                showFormControls={false}
              />
            </div>
          </TabPane>
          <TabPane eventKey="schema">
            <pre>{ JSON.stringify(schema, null, '  ') }</pre>
          </TabPane>
          { edit &&
            <TabPane eventKey="properties">
              <div className="form"><Properties edit={edit} dispatch={dispatch} /></div>
            </TabPane>
          }
        </TabContent>
      </div>
    </TabContainer>
  )
};

export default Sidebar;
