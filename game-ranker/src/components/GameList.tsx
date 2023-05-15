import React, { ReactElement, useState } from "react";
import {dbGameEntry, currentlyVisibleStateProps} from "./NewGameEntry";



const GameList : React.FC = () : ReactElement => {
  const [gameList, setGameList] = useState<dbGameEntry[]>([])

  return(
    <React.Fragment>
      <h4>Hello</h4>
    </React.Fragment>
  )
}

export default GameList;