import React, { ReactElement, useEffect, useState } from "react";
import db from "../firebase";
import { collection, addDoc } from "firebase/firestore";

interface Game {
  name: string;
  genre: [] | undefined
}

const ListOfGames: React.FC = () : ReactElement => {
  const [gamesList, setGamesList] = useState<Game[]>([]);

  useEffect(() => {
    fetch(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&platform=4&page_size=40`)
        .then(response => response.json())
        .then((jsonifiedResponse) => {
          setGamesList(jsonifiedResponse.results);
        });
  }, []);

  // useEffect(() => {
  //   const fetchGames = async () => {
  //     let currentPage = 1;
  //     let totalPages = 1;
  //     let results: Game [] = [];

  //     while (currentPage <= totalPages) {
  //       const response = await fetch(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&platform=4&tags=multiplayer`)
  //     }
  //   }
  // })

  return (
    <React.Fragment>
      <ol>
        {gamesList.map((game, index) => (
          <li key={index}>
            <h3>{game.name}+{}</h3>
            <button>Hello</button>
          </li>
        ))}
      </ol>
    </React.Fragment>
  )
}

export default ListOfGames;