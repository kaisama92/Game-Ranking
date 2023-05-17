import React from "react";
import Modal from "./Modal";

interface BaseModalWrapperProps {
  isModalVisible: boolean;
  onBackdropClick: () => void;
  header: string;
}

const BaseModalWrapper: React.FC<BaseModalWrapperProps> = ({onBackdropClick, isModalVisible, header}) => {
  if(!isModalVisible) {
    return null;
  }
  return (<Modal onBackdropClick={onBackdropClick}>
    <h3 className="desktopModalContainer" >
      <p className="modalInfo">{header}</p>
    </h3>
  </Modal>);
}

export default BaseModalWrapper;