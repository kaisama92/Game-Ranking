import React from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  onBackdropClick: () => void;
  children?: any;
}

const Modal: React.FC<ModalProps> = ({onBackdropClick, children}) => {

  return ReactDOM.createPortal(<div className="modalOverlay" onClick={onBackdropClick} >
    <div onClick={e => e.stopPropagation()}>
      {children}
    </div>
  </div>, document.getElementById('modal-root')!);
}

export default Modal;