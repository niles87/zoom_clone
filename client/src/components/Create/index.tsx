import React, { Fragment, useState } from "react";
import { Modal, MButton } from "../Modal";

export const Create = (props: any) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const closeModal = () => {
    setShowModal(false);
  };

  const openModal = () => {
    setShowModal(true);
  };
  return (
    <Fragment>
      <Modal show={showModal} handleClose={closeModal}>
        <div>
          <MButton>Create a new Room</MButton>
        </div>
        <div>
          <p>Did you mean to join a room?</p>
          <ul>
            <li>rooms</li>
          </ul>
        </div>
      </Modal>
      <div>
        <button onClick={openModal}>View/Create Room</button>
      </div>
    </Fragment>
  );
};
