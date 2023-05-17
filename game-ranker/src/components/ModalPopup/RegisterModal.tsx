import React, { useState } from "react";
import BaseModalWrapper from "./BaseModalWrapper";

interface RegisterArgs {
  password: string;
  email: string;
}

interface RegisterModalProps {
  onBackdropClick: () => void;
  isRegisterModalVisible: boolean;
  registerError?: string;
  onRegisterRequested: RegisterFunction;
}

export type RegisterFunction = (args: RegisterArgs) => Promise<void>;

const RegisterModal: React.FC<RegisterModalProps> = ({onBackdropClick, onRegisterRequested, isRegisterModalVisible, registerError}) => {
  
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if(e.key === 'Enter') {
      onRegisterRequested({email, password});
    }
  }

  return (<BaseModalWrapper 
    onBackdropClick={onBackdropClick}
    isRegisterModalVisible={isRegisterModalVisible}
    header="Sign Up"
    message="Register to continue using site"
    content={
      <>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={onKeyDown} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={onKeyDown} pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+"/>
        <button className="center" onClick={() => onRegisterRequested({email, password})} >Register</button>
      </>
    }
  />)
}

export default RegisterModal