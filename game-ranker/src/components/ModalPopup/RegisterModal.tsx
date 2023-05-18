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

  if (!isRegisterModalVisible){
    return null;
  } else {
    return (<BaseModalWrapper 
      onBackdropClick={onBackdropClick}
      isRegisterModalVisible={isRegisterModalVisible}
      header="Sign Up"
      message="Register to continue using site"
      content={
        <>
          <p className="regParam">Enter Your Email</p>
          <input className="paddington" type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={onKeyDown} /><br/>
          <p className="regParam">Password Must have 1 Capital, 1 Lowercase, 1 number, and 1 symbol</p>
          <input className="paddington" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} onKeyDown={onKeyDown} pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+"/>
          {registerError && <div className="error">{registerError}</div>}
          <button className="center" onClick={() => onRegisterRequested({email, password})} >Register</button>
        </>
      }
    />)
  }
}

export default RegisterModal