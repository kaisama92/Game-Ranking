import React, { useState } from "react";
import BaseModalWrapper from "./BaseModalWrapper";

interface LoginArgs {
  password: string;
  login: string;
}

interface LoginModalProps {
  onBackdropClick: () => void;
  isModalVisible: boolean;
  loginError?: string;
  onLoginRequested: LoginFunction;
}

export type LoginFunction = (args: LoginArgs) => Promise<void>;


const LoginModal: React.FC<LoginModalProps> = ({loginError, isModalVisible, onBackdropClick, onLoginRequested}) => {

  const [ login, setLogin ] = useState('');
  const [ password, setPassword ] = useState('');

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      onLoginRequested({login, password});
    }
  }

  return (<BaseModalWrapper 
    onBackdropClick={onBackdropClick}
    isModalVisible={isModalVisible}
    header="Login"
    message="Please log in"
    content={
      <>
        <input type="email" placeholder="Email" value={login} onChange={e => setLogin(e.target.value)} onKeyDown={onKeyDown}/><br/>
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={onKeyDown} /><br/>
        {loginError && <div className="error">{loginError}</div>}
        <button className="center" onClick={() => onLoginRequested({password, login})} >Login</button>
        <button >Or Register</button>
      </>
    }
  />);
}

export default LoginModal;