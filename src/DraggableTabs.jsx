import React, { useState } from 'react';
import { TabContainer, Nav, NavItem, TabContent, TabPane } from 'patternfly-react';


export default (dispatch) => {
  const DraggableTabs = ({ fields, formOptions }) => {
    const [activeTab, setActiveTab] = useState(0);

    const handleSelect = (eventKey) => setActiveTab(eventKey);

    const renderTabHeader = (items) => items.map(({ title }, index) => {
      return (
        <NavItem key={ index } eventKey={ index }>
          { title }
        </NavItem>
      );
    });

    const renderTabContent = (items, formOptions) => items.map(({ fields }, index) => {
      return (
        <TabPane key={ index } eventKey={ index } >
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
