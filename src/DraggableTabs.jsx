import React, { useState } from 'react';
import { TabContainer, Nav, NavItem, TabContent } from 'patternfly-react';

import DraggableTabHeader from './DraggableTabHeader';
import DraggableTabContent from './DraggableTabContent';

export default (dispatch) => {
  const DraggableTabs = ({ name:target, fields, formOptions }) => {
    const [activeTab, setActiveTab] = useState(fields[0].name);

    if (!fields.find(item => item.name === activeTab)) {
      setActiveTab(fields[0].name);
    }

    const renderTabHeader = (items) => items.map(({ name, title }) => (
      <DraggableTabHeader
        key={name}
        active={activeTab === name}
        {...{name, title, setActiveTab, dispatch}}
      />
    ));

    return (
      <TabContainer id="dialog-renderer-tabs" activeKey={activeTab} onSelect={() => undefined}>
        <div>
          <Nav bsClass="nav nav-tabs">
            { renderTabHeader(fields) }
            <NavItem eventKey="newTab" onSelect={() => dispatch({type: 'newTab', target})}>
              <i className="fa fa-plus"></i> New Tab
            </NavItem>
          </Nav>
          <TabContent animation>
            <div className="spacer"></div>
            { fields.map(({ name, fields }) => <DraggableTabContent key={name} { ...{name, fields, formOptions, dispatch }} />) }
          </TabContent>
        </div>
      </TabContainer>
    )
  };

  return DraggableTabs;
};
