import React, { useRef } from "react";

import Properties from './Properties';

const Sidebar = ({
  formFieldsMapper,
  layoutMapper,
  PropertiesModal,
  editSchema,
  schema,
  edit,
  dispatch
}) => {
  const modalContainer = useRef(null);
  const displayModal = modalContainer.current && window.getComputedStyle(modalContainer.current).display !== 'none';

  const properties = <Properties
    formFieldsMapper={formFieldsMapper}
    layoutMapper={layoutMapper}
    editSchema={editSchema}
    schema={schema}
    edit={edit}
    dispatch={dispatch}
  />;

  return (
    <>
      { edit ? (
          <div className="hide-small properties">
            { properties }
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
              { properties }
            </div>
          }
        </PropertiesModal>
      }
    </>
  );
};

export default Sidebar;
