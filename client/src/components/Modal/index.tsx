import React from "react";
import "./modal.css";

export const Modal = (props: any) => {
  const modalClass = props.show ? "modal active" : "modal hide";
  return (
    <div className={modalClass}>
      <div className="modal-main">
        {props.children}
        <button className="cancel" onClick={props.handleClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};
