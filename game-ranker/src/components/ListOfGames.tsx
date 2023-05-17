import React, { ReactElement, useEffect, useState } from "react";
import SearchForGame from "./SearchForGame";
import GameList from "./GameList";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
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
  const urlBase: string = `https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&platform=4`

  const [currentlyVisibleState, setCurrentlyVisibleState] = useState<JSX.Element>();
  const [ searchVisible, setSearchVisible ] = useState(true);
  const [ counter, setCounter ] = useState(0);
  const [ buttonText, setButtonText ] = useState("See List Of Games");
  const [ isModalVisible, setIsModalVisible ] = useState(false);
  const [ isRegisterModalVisible, setIsRegisterModalVisible ] = useState(false);
  


  const changeCurrentlyVisibleState = () : void => {
    console.log("trying to change visible state" + currentlyVisibleState)
    if (!searchVisible){
      setCurrentlyVisibleState(<SearchForGame/>);
    } else {
      setCurrentlyVisibleState(<GameList />)
    }
  }

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  }

  const toggleRegisterModal = () => {
    setIsRegisterModalVisible(!isRegisterModalVisible);
  }

  const onBackdropClick = () => {
    setIsModalVisible(false);
    setIsRegisterModalVisible(false);
  }

  const onLoginRequest : LoginFunction = async ({password, login}) => {
    ;
  }

  const onRegisterRequest : RegisterFunction = async ({email, password}) => {
    if (email !== undefined && email !== null && password !== undefined && password !== null) {
      createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
          });
    }
  }

  useEffect(() => {
    console.log(`search change ${counter} ${searchVisible}`);
    if (counter !== undefined && counter === 0) {
      setCurrentlyVisibleState(<SearchForGame/>)
    }
  }, [counter, searchVisible]);

  return (
    <React.Fragment>
      <button onClick={toggleModal}>Sign In</button>
      <LoginModal loginError="I am an Error" onBackdropClick={onBackdropClick} onLoginRequested={onLoginRequest} isModalVisible={isModalVisible} isRegisterModalVisible={isRegisterModalVisible} toggleRegisterModal={toggleRegisterModal}/> 
      <RegisterModal registerError="I am an Error" onBackdropClick={onBackdropClick} onRegisterRequested={onRegisterRequest} isRegisterModalVisible={isRegisterModalVisible}/>
      <GameList />
      {/* <button onClick={() => buttonClick()} >{buttonText}</button> */}
      {currentlyVisibleState}
    </React.Fragment>
  )
}

export default ListOfGames;
