import React, { useState, useContext } from 'react';
import { TabContainer, Nav, NavItem } from 'patternfly-react';
import { TabContent as PfTabContent } from 'patternfly-react';

import { Context } from '../Editor';
import TabHeader from './TabHeader';
import TabContent from './TabContent';

export default () => {
  const DraggableTabs = ({ name:target, fields, formOptions }) => {
    const dispatch = useContext(Context);

    // Try to retrieve the name of the very first tab
    const firstTab = (() => {
      const [tab] = fields;
      const { name:tabName } = tab || {};
      return tabName;
    })();

    const [activeTab, setActiveTab] = useState(firstTab);

    if (!fields.find(item => item.name === activeTab) && firstTab) {
      setActiveTab(firstTab);
    }

    const renderTabHeader = (items) => items.map(({ name, title }) => (
      <TabHeader
        key={ name }
        active={ activeTab === name }
        single={ items.length === 1 }
        { ...{name, title, setActiveTab, dispatch} }
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
          <PfTabContent animation>
            <div className="spacer"></div>
            { fields.map(({ name, fields }) => <TabContent key={name} { ...{name, fields, formOptions, dispatch }} />) }
          </PfTabContent>
        </div>
      </TabContainer>
    )
  };

  return DraggableTabs;
};
