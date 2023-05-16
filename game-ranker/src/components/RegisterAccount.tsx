import React, { ReactElement } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const registerForAccount : React.FC = () : ReactElement => {

  const handleRegistration = (event: FormEvent ) : void => {
    event.preventDefault();
    const { target } = event;
    const auth = getAuth();
    if (target) {
      createUserWithEmailAndPassword(auth, target.email, target.password)
          .then((userCredential) => {
            const user = userCredential.user;
          })
    }
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