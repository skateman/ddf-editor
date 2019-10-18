import React, { useState, useEffect, useRef } from "react";
import { TabContainer, Nav, NavItem, TabContent, TabPane } from 'patternfly-react';
import { formFieldsMapper, layoutMapper } from '@data-driven-forms/pf3-component-mapper';
import FormRender from '@data-driven-forms/react-form-renderer';
import { Modal } from 'patternfly-react';

import Properties from './Properties';
import { dialogDetailsSchema } from './editSchema';

const Sidebar = ({ schema, edit, dispatch }) => {
  const [activeTab, setActiveTab] = useState('dialog');
  const modalContainer = useRef(null);

  useEffect(() => setActiveTab(edit ? 'properties' : 'dialog'), [edit]);

  const displayModal = modalContainer.current && window.getComputedStyle(modalContainer.current).display !== 'none';

  return (
    <>
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

      <div className="modal-container" ref={modalContainer}></div>
      <Modal container={modalContainer.current} show={edit && displayModal} onHide={() => dispatch({ type: 'editEnd' })}>
        <Modal.Header closeButton>
          <Modal.Title>Properties</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          { edit &&
            <div className="form">
              <Properties edit={edit} dispatch={dispatch} />
            </div>
          }
        </Modal.Body>
      </Modal>
    </>
  )
};

export default Sidebar;
