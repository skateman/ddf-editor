import React, { useState, useEffect, useRef } from "react";
import { TabContainer, Nav, NavItem, TabContent, TabPane } from 'patternfly-react';
import { Modal } from 'patternfly-react';

import Properties from './Properties';

const Sidebar = ({ schema, edit, dispatch }) => {
  const [activeTab, setActiveTab] = useState('dialog');
  const modalContainer = useRef(null);

  useEffect(() => setActiveTab(edit ? 'properties' : 'schema'), [edit]);

  const displayModal = modalContainer.current && window.getComputedStyle(modalContainer.current).display !== 'none';

  return (
    <>
      <TabContainer id="dialog-properties-tabs" activeKey={activeTab} onSelect={tab => setActiveTab(tab)}>
        <div>
          <Nav bsClass="nav nav-tabs">
            <NavItem eventKey="schema">Schema</NavItem>
            <NavItem eventKey="properties" disabled={!edit}>Properties</NavItem>
          </Nav>
          <TabContent animation>
            <TabPane eventKey="schema">
              <pre className="schema">{ JSON.stringify(schema, null, '  ') }</pre>
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
