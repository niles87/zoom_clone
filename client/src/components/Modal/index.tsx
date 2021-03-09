import React from "react";
import styled from "styled-components";

export const MSelect = styled.select`
    border-color: rgb(68, 68, 68);
    border-radius: 5px;
    margin-bottom: 15px;
`

export const MButton = styled.button`
    margin: 5px;
    padding: 5px;
    background-color: rgb(0, 75, 12);
    color: rgb(255, 255, 255);
    border-color: transparent;
    border-radius: 5px;
    cursor: pointer;
`

const ModalWrapper = styled.div<{ show: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    display: ${props => props.show ? "block" : "none"}
`

const ModalMain = styled.div`
    position: fixed;
    background: rgb(244,244,244);
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 20px;
    border-radius: 10px;
`

const ModalCancel = styled(MButton)`
    color: rgb(255, 255, 255);
    background-color: rgb(168, 17, 17);
`

interface modalProps {
  children: React.ReactNode
  show: boolean
  handleClose: () => void
}

export const Modal = (props: modalProps) => {
  return (
    <ModalWrapper show={props.show}>
      <ModalMain>
        {props.children}
        <ModalCancel className="cancel" onClick={props.handleClose}>
          Cancel
        </ModalCancel>
      </ModalMain>
    </ModalWrapper>
  );
};