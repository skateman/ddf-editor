import React, { useRef } from "react";

import Properties from './Properties';

const Sidebar = ({ PropertiesModal, editSchema, schema, edit, dispatch }) => {
  const modalContainer = useRef(null);
  const displayModal = modalContainer.current && window.getComputedStyle(modalContainer.current).display !== 'none';

  return (
    <>
      { edit ? (
          <div className="hide-small properties">
            <Properties editSchema={editSchema} schema={schema} edit={edit} dispatch={dispatch}/>
          </div>
        ) : (
          <pre className="hide-small schema">{ JSON.stringify(schema, null, '  ') }</pre>
        )
      }

      <div className="modal-container" ref={modalContainer}></div>

      { PropertiesModal &&
        <PropertiesModal title="Properties" show={edit && displayModal} onHide={() => dispatch({ type: 'editEnd' })} container={modalContainer.current}>
          { edit &&
            <div className="properties">
              <Properties editSchema={editSchema} schema={schema} edit={edit} dispatch={dispatch} />
            </div>
          }
        </PropertiesModal>
      }
    </>
  );
};

export default Sidebar;
