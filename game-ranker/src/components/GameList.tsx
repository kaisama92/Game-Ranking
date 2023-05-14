import React, { ReactElement, useState } from "react";
import {dbGameEntry, currentlyVisibleStateProps} from "./NewGameEntry";



const GameList : React.FC = () : ReactElement => {
  const [gameList, setGameList] = useState<dbGameEntry[]>([])

  return(
    <React.Fragment>
      {gameList.map((game, index) => (
        <li key={index} >
          <h3>{game.name}</h3>
          <p>{game.upvotes}</p>
          <p>{game.downvotes}</p>
          <p>{game.metacritic}</p>
        </li>
      ))}
    </React.Fragment>
  )
}

export default GameList;