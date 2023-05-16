import React, { ReactElement, FormEvent } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const registerForAccount : React.FC = () : ReactElement => {

  const handleRegistration = (event: FormEvent ) : void => {
    event.preventDefault();
    const { target } = event;
    const auth = getAuth();
    if (target) {
      createUserWithEmailAndPassword(auth, (target as HTMLFormElement).email.value, ( target as HTMLFormElement ).password.value)
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
        <button type="submit">Register</button>
      </form>
    </React.Fragment>
  )
}

export default registerForAccount;