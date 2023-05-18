import React, { useState } from "react";
import BaseModalWrapper from "./BaseModalWrapper";

interface LoginArgs {
  password: string;
  email: string;
}

interface LoginModalProps {
  onBackdropClick: () => void;
  isModalVisible: boolean;
  isRegisterModalVisible?: boolean;
  loginError?: string;
  onLoginRequested: LoginFunction;
  toggleRegisterModal: () => void;
}

export type LoginFunction = (args: LoginArgs) => Promise<void>;


const LoginModal: React.FC<LoginModalProps> = ({loginError, isRegisterModalVisible, isModalVisible, onBackdropClick, onLoginRequested, toggleRegisterModal}) => {

  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      onLoginRequested({email, password});
    }
  }
  const registerToggle = () => {
    toggleRegisterModal();
  }

  if(!isModalVisible){
    return null;
  } else {

  return (<BaseModalWrapper 
    onBackdropClick={onBackdropClick}
    isModalVisible={isModalVisible}
    isRegisterModalVisible={isRegisterModalVisible}
    header="Login"
    message="Please log in"
    content={
      <>
        <input className="paddington" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={onKeyDown}/><br/>
        <input className="paddington" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={onKeyDown} /><br/>
        {loginError && <div className="error">{loginError}</div>}
        <button className="center" onClick={() => onLoginRequested({password, email})} >Login</button>
        <button onClick={() => registerToggle()}>Or Register</button>
      </>
    }
  />);
  }
}

export default LoginModal;