import React, { ReactElement, useEffect, useState } from "react";
import SearchForGame from "./SearchForGame";
import GameList from "./GameList";
import { createUserWithEmailAndPassword, signOut, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth"
import LoginModal, { LoginFunction } from "./ModalPopup/LoginModal";
import RegisterModal, { RegisterFunction } from "./ModalPopup/RegisterModal";
import { auth } from "../firebase";


export interface Game {
  name: string;
  slug: string;
  upvotes: number;
  downvotes: number;
  metacritic: number;
}

const ListOfGames: React.FC = () : ReactElement => {
  const [ isModalVisible, setIsModalVisible ] = useState(false);
  const [ isRegisterModalVisible, setIsRegisterModalVisible ] = useState(false);
  const [ modalVisible, setModalVisible ] = useState<JSX.Element>();
  const [ loginError, setLoginError ] = useState('');
  const [ registerError, setRegisterError ] = useState(' ');
  const [ user, setUser ] = useState('')
  
  


  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  }

  const toggleRegisterModal = () => {
    console.log(isModalVisible);
    setIsRegisterModalVisible(true);

  }

  const onBackdropClick = () => {
    setIsModalVisible(false);
    setIsRegisterModalVisible(false);
  }

  const onLoginRequest : LoginFunction = async ({password, email}) => {
    signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          onBackdropClick();
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoginError(errorCode + " " + errorMessage)
        });
  }

  const onRegisterRequest : RegisterFunction = async ({email, password}) => {
    const regex = new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*\\W).{8,}$');
    if (email !== undefined && email !== null && password !== undefined && password !== null) {
      if(regex.test(password)) {
        createUserWithEmailAndPassword(auth, email, password)
            .then(() => {
              onBackdropClick();
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
              setRegisterError(errorCode + " " + errorMessage);            
            });
          } else {
            setRegisterError("Password Does Not Meet Requirements");
          }
    }
  }

  useEffect(() => {
    onAuthStateChanged(auth,(user) => {
      if(user) {
        setUser(user.uid);
      } else {
        setUser('');
      }
    })
  }, [isModalVisible])

  const logOut = () => {
    signOut(auth);
  }
  
  useEffect(() => {
    if (!isRegisterModalVisible) {
      setModalVisible(<LoginModal loginError={loginError} onBackdropClick={onBackdropClick} onLoginRequested={onLoginRequest} isModalVisible={isModalVisible} isRegisterModalVisible={isRegisterModalVisible} toggleRegisterModal={toggleRegisterModal}/> 
      )
    } else {
      setModalVisible(<RegisterModal registerError={registerError} onBackdropClick={onBackdropClick} onRegisterRequested={onRegisterRequest} isRegisterModalVisible={isRegisterModalVisible}/>)
    }
  }, [isRegisterModalVisible, isModalVisible])

  if (user !== '') {
    return (
      <React.Fragment>
        <button onClick={() => logOut()}>Sign Out</button>
        {modalVisible}
        <GameList user={user}/>
        <SearchForGame/>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <button onClick={toggleModal}>Sign In</button>
        {modalVisible}
      </React.Fragment>
    )
  }
}

export default ListOfGames;
