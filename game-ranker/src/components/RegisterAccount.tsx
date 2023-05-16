import React, { ReactElement } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const registerForAccount : React.FC = () : ReactElement => {

  const handleRegistration = (email: string, password: string ) : void => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
  }

  return (
    <React.Fragment>
      <form onSubmit={handleRegistration} >
        <input type="email" name="email"/>
        <input type="text" name="password" pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+" />
      </form>
    </React.Fragment>
  )
}