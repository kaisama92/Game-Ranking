import React from "react";
import Modal from "./Modal";

interface BaseModalWrapperProps {
  isModalVisible: boolean;
  onBackdropClick: () => void;
}

const BaseModalWrapper: React.FC<BaseModalWrapperProps> = ({onBackdropClick, isModalVisible}) => {
  if(!isModalVisible) {
    return null;
  }
  return (<Modal onBackdropClick={onBackdropClick}>
    <h3 className="desktopModalContainer" >
      <p className="modalInfo">Modal Info</p>
    </h3>
  </Modal>);
}

export default BaseModalWrapper;