import React, { ReactElement, useEffect, useState } from "react";

interface Game {
  name: string;
}

const ListOfGames: React.FC = () : ReactElement => {
  const [gamesList, setGamesList] = useState<Game[]>([]);

  // useEffect(() => {
  //   fetch(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&platform=4&page_size=10001`)
  //       .then(response => response.json())
  //       .then((jsonifiedResponse) => {
  //         setGamesList(jsonifiedResponse.results);
  //       });
  // }, []);

  useEffect(() => {
    const fetchGames = async () => {
      let currentPage = 1;
      let totalPages = 1;
      let results: Game [] = [];

      while (currentPage <= totalPages) {
        const response = await fetch(`https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&platform=4&tags=multiplayer`)
      }
    }
  })

  return (
    <React.Fragment>
      <ul>
        {gamesList.map((game, index) => (
          <li key={index}>
            <h3>{game.name}</h3>
          </li>
        ))}
      </ul>
    </React.Fragment>
  )
}

export default ListOfGames;