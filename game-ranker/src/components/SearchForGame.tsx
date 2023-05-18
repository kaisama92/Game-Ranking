import React, {useState, FormEvent, ReactElement, useEffect} from "react";
import {dbGameEntry, searchFor} from "./Interfaces";
import db from "../firebase";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

const SearchForGame: React.FC = (): ReactElement => {

  const [game, setGame] = useState<dbGameEntry>()
  const [searchList, setSearchList] = useState<searchFor[]>([]);
  const urlBase: string = `https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&platform=4`


  const handleFormSubmission = (event: FormEvent): void => {
    event.preventDefault();
    const {target} = event;
    if (target) {
      fetch(`${urlBase}&search=${(target as HTMLFormElement).search.value}&exclude_additions=true`)
      .then(response => response.json())
      .then((jsonifiedResponse): void => {
        setSearchList(jsonifiedResponse.results);
      })
    }
  } 

    
  const addGameToDB = async (game: dbGameEntry): Promise<void> => {
    await addDoc(collection(db, "games"), game);
    setGame(undefined);
  }

  useEffect(() => {
    if (game !== undefined){
      addGameToDB(game);
    }
  }, [game]) 
    
  const addGameToList = (name: string, slug: string, metacritic: number): void => {
    setGame({name: name, slug: slug, upvotes: 1, downvotes: 0, metacritic: metacritic});
  }

  return (
    <React.Fragment>
      <form onSubmit={handleFormSubmission}>
        <input 
          type="text"
          name="search"
          placeholder="Search For Game Here"/>
        <button type="submit">Search</button>
      </form>
      <ol>{searchList.map((game, index) => (
          <li key={index}>
            <h3>{game.name}</h3>
            <button onClick={() => addGameToList(game.name, game.slug, game.metacritic)}>Add To List</button>
          </li>
        ))}
      </ol>
    </React.Fragment>
  )
}

export default SearchForGame