import React from "react";
import { TabContainer, Nav, NavItem, TabContent, TabPane } from 'patternfly-react';
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/pf3-component-mapper';
import FormRender from '@data-driven-forms/react-form-renderer';

import { dialogDetailsSchema } from './constants';

const Properties = ({ schema }) => {
  return (
    <TabContainer id="dialog-properties-tabs" defaultActiveKey={0}>
      <div>
        <Nav bsClass="nav nav-tabs">
          <NavItem eventKey={0}>Dialog</NavItem>
          <NavItem eventKey={1}>Schema</NavItem>
          <NavItem eventKey={2}>Properties</NavItem>
        </Nav>
        <TabContent animation>
          <TabPane eventKey={0}>
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
          <TabPane eventKey={1}>
            <pre>{ JSON.stringify(schema, null, '  ') }</pre>
          </TabPane>
          <TabPane eventKey={2}>
            <div className="form"></div>
          </TabPane>
        </TabContent>
      </div>
    </TabContainer>
  )
};

export default Properties;
