import React, { useState } from 'react';
import { TabContainer, Nav, TabContent, TabPane } from 'patternfly-react';

import DraggableTabHeader from './DraggableTabHeader';

export default (dispatch) => {
  const DraggableTabs = ({ fields, formOptions }) => {
    const [activeTab, setActiveTab] = useState(fields[0].name);
    const handleSelect = (eventKey) => setActiveTab(eventKey);

    const renderTabHeader = (items) => items.map(({ name, title }) => (
      <DraggableTabHeader
        key={name}
        active={activeTab === name}
        {...{name, title, handleSelect, dispatch}}
      />
    ));

    const renderTabContent = (items, formOptions) => items.map(({ name, fields }) => {
      return (
        <TabPane key={ name } eventKey={ name } >
          { formOptions.renderForm(fields, formOptions) }
        </TabPane>
      )
    });

    return (
      <TabContainer id="basic-tabs-pf" activeKey={activeTab} onSelect={handleSelect}>
        <div>
          <Nav bsClass="nav nav-tabs">
            { renderTabHeader(fields) }
          </Nav>
          <TabContent animation>
            { renderTabContent(fields, formOptions) }
          </TabContent>
        </div>
      </TabContainer>
    )
  };

  return DraggableTabs;
};
