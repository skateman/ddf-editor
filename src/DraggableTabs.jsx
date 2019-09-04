import React, { useState } from 'react';
import { TabContainer, Nav, NavItem, TabContent, TabPane } from 'patternfly-react';

import DraggableTabHeader from './DraggableTabHeader';

export default (dispatch) => {
  const DraggableTabs = ({ name:target, fields, formOptions }) => {
    const [activeTab, setActiveTab] = useState(fields[0].name);

    const renderTabHeader = (items) => items.map(({ name, title }) => (
      <DraggableTabHeader
        key={name}
        active={activeTab === name}
        {...{name, title, setActiveTab, dispatch}}
      />
    ));

    const renderTabContent = (items, formOptions) => items.map(({ name, fields }) => {
      return (
        <TabPane key={ name } eventKey={ name } >
          { formOptions.renderForm(fields, formOptions) }
          <div className="section-wrapper">
            <div className="item new-section" onClick={() => dispatch({type: 'newSection', target: name})}>
              <i className="fa fa-plus"></i> New section
            </div>
          </div>
        </TabPane>
      )
    });

    return (
      <TabContainer id="basic-tabs-pf" activeKey={activeTab} onSelect={() => undefined}>
        <div>
          <Nav bsClass="nav nav-tabs">
            { renderTabHeader(fields) }
            <NavItem eventKey="newTab" onSelect={() => dispatch({type: 'newTab', target})}>
              <i className="fa fa-plus"></i> New Tab
            </NavItem>
          </Nav>
          <TabContent animation>
            <div class="spacer"></div>
            { renderTabContent(fields, formOptions) }
          </TabContent>
        </div>
      </TabContainer>
    )
  };

  return DraggableTabs;
};
