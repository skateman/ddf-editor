import React from "react";
import { TabContainer, Nav, NavItem, TabContent, TabPane } from 'patternfly-react';

const Properties = ({ schema }) => {
  return (
    <TabContainer defaultActiveKey={1}>
      <div>
        <Nav bsClass="nav nav-tabs">
          <NavItem eventKey={0}>Properties</NavItem>
          <NavItem eventKey={1}>Schema</NavItem>
        </Nav>
        <TabContent animation>
          <TabPane eventKey={0}></TabPane>
          <TabPane eventKey={1}>
            <pre>{ JSON.stringify(schema, null, '  ') }</pre>
          </TabPane>
        </TabContent>
      </div>
    </TabContainer>
  )
};

export default Properties;
