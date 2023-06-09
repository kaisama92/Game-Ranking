import React, { ReactNode } from "react";
import Modal from "./Modal";

interface BaseModalWrapperProps {
  isModalVisible?: boolean;
  onBackdropClick: () => void;
  header: string;
  message?: string;
  content?: ReactNode;
  isRegisterModalVisible?: boolean;
}

const BaseModalWrapper: React.FC<BaseModalWrapperProps> = ({content, isRegisterModalVisible, onBackdropClick, isModalVisible, header, message}) => {
  if (!isModalVisible && !isRegisterModalVisible) {
    return null;
  } else {
  return (<Modal onBackdropClick={onBackdropClick}>
    <h3 className="desktopModalContainer" >
      <p className="modalInfo">{header}</p>
      {message && <p className="message">{message}</p>}
      {content}
    </h3>
  </Modal>);
  }
}

export default BaseModalWrapper;