import React, { FormEvent, FormEventHandler, ReactElement, useEffect, useState } from "react";
import db from "../firebase";
import { collection, addDoc } from "firebase/firestore";

interface Game {
  name: string;
  slug: string;
}

interface searchFor {
  name: string;
  slug: string;
}

interface search {
  search: string;
}

const ListOfGames: React.FC = () : ReactElement => {
  const urlBase: string = `https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&platform=4`
  const [gamesList, setGamesList] = useState<Game[]>([]);
  const [searchList, setSearchList] = useState<searchFor[]>([]);

  // useEffect((): void => {
  //   fetch(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&platform=4&page_size=40`)
  //       .then(response => response.json())
  //       .then((jsonifiedResponse) => {
  //         setGamesList(jsonifiedResponse.results);
  //       });
  // }, []);

  const searchForGame = (query: string): void => {
    fetch(`${urlBase}&search=${query}`)
        .then(response => response.json())
        .then((jsonifiedResponse): void => {
          setSearchList(jsonifiedResponse.results);
        })
  }

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
            <h3>{game.name}
            </h3>
          </li>
        ))}
      </ol>
    </React.Fragment>
  )
}

export default ListOfGames;