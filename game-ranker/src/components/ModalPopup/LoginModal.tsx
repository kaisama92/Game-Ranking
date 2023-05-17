import React from "react";
import BaseModalWrapper from "./BaseModalWrapper";

interface LoginArgs {
  password: string;
  login: string;
}

export type LoginFunction = (args: LoginArgs) => Promise<void>;

interface LoginModalProps {
  onBackdropClick: () => void;
  isModalVisible: boolean;
  loginError?: string;
  onLoginRequested: LoginFunction;
}

const LoginModal: React.FC<LoginModalProps> = ({loginError, isModalVisible, onBackdropClick, onLoginRequested}) => {
  return (<BaseModalWrapper 
    onBackdropClick={onBackdropClick}
    isModalVisible={isModalVisible}
    header="Login"
    message="Please log in"
    content={
      <form>
        <input type="email" placeholder="Email" /><br/>
        <input type="password" placeholder="Password" /><br/>
        <button className="center" type="submit" >Login</button>
      </form>
    }
  />);
}

export default LoginModal;