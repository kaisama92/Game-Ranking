import React, { ReactElement, useEffect, useState } from "react";
import SearchForGame from "./SearchForGame";
import GameList from "./GameList";

export interface Game {
  name: string;
  slug: string;
  upvotes: number;
  downvotes: number;
  metacritic: number;
}

const ListOfGames: React.FC = () : ReactElement => {
  const urlBase: string = `https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&platform=4`

  const [currentlyVisibleState, setCurrentlyVisibleState] = useState(<SearchForGame/>);
  const [ searchVisible, setSearchVisible ] = useState(true)

  const changeCurrentlyVisibleState = () : void => {
    console.log("trying to change visible state")
    if (currentlyVisibleState === <SearchForGame/>){
      setCurrentlyVisibleState(<GameList/>);
    }
    setSearchVisible(!searchVisible);
  }

  useEffect(() => {
    console.log("Visible State Updated")
  }, [searchVisible]);


  return (
    <React.Fragment>
      <button onClick={() => changeCurrentlyVisibleState} >See List Of Games</button>
      {currentlyVisibleState}
    </React.Fragment>
  )
}

export default ListOfGames;
