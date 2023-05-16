import React, { ReactElement, useEffect, useState } from "react";
import SearchForGame from "./SearchForGame";
import GameList from "./GameList";
import { getAuth } from "firebase/auth"
import BaseModalWrapper from "./ModalPopup/BaseModalWrapper";

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


  const changeCurrentlyVisibleState = () : void => {
    console.log("trying to change visible state" + currentlyVisibleState)
    if (!searchVisible){
      setCurrentlyVisibleState(<SearchForGame/>);
    } else {
      setCurrentlyVisibleState(<GameList />)
    }
  }

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible)
  }

  useEffect(() => {
    console.log(`search change ${counter} ${searchVisible}`);
    if (counter !== undefined && counter === 0) {
      setCurrentlyVisibleState(<SearchForGame/>)
    }
  }, [counter, searchVisible]);

  return (
    <React.Fragment>
      <button onClick={toggleModal}>Show Modal</button>
      <BaseModalWrapper isModalVisible={isModalVisible} onBackdropClick={toggleModal}/> 
      <GameList />
      {/* <button onClick={() => buttonClick()} >{buttonText}</button> */}
      {currentlyVisibleState}
    </React.Fragment>
  )
}

export default ListOfGames;
