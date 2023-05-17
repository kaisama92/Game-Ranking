import React, { ReactNode } from "react";
import Modal from "./Modal";

interface BaseModalWrapperProps {
  isModalVisible: boolean;
  onBackdropClick: () => void;
  header: string;
  message?: string;
  content?: ReactNode;
}

const BaseModalWrapper: React.FC<BaseModalWrapperProps> = ({onBackdropClick, isModalVisible, header, message}) => {
  if(!isModalVisible) {
    return null;
  }
  return (<Modal onBackdropClick={onBackdropClick}>
    <h3 className="desktopModalContainer" >
      <p className="modalInfo">{header}</p>
      {message && <p className="message">{message}</p>}
    </h3>
  </Modal>);
}

export default BaseModalWrapper;