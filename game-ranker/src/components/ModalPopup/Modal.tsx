import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  onBackdropClick: () => void;
  children?: any;
}

const Modal: React.FC<ModalProps> = ({onBackdropClick, children}) => {
  return ReactDOM.createPortal(<div onClick={onBackdropClick} >
    <span>I'm a modal</span>
  </div>, document.getElementById('modal-root')!);
}

export default Modal;