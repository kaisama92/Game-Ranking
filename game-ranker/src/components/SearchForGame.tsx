import React, {useState, FormEvent, ReactElement, useEffect} from "react";
import {dbGameEntry, searchFor, searchProps} from "./Interfaces";
import db from "../firebase";
import { collection, addDoc, onSnapshot } from "firebase/firestore";

const SearchForGame: React.FC<searchProps> = ({user}): ReactElement => {

  const [game, setGame] = useState<dbGameEntry>()
  const [ error, setError ] = useState('')
  const [searchList, setSearchList] = useState<searchFor[]>([]);
  const [ gameArr, setGameArr ] = useState<dbGameEntry[]> ([])
  const urlBase: string = `https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}&platform=4`


  const handleFormSubmission = (event: FormEvent): void => {
    event.preventDefault();
    const {target} = event;
    if (target) {
      fetch(`${urlBase}&search_precise=true&search=${(target as HTMLFormElement).search.value}&exclude_additions=true&page_size=10`)
      .then(response => response.json())
      .then((jsonifiedResponse): void => {
        setSearchList(jsonifiedResponse.results);
      })
    }
  } 

    
  const addGameToDB = async (game: dbGameEntry): Promise<void> => {
    if (gameArr.some((entry) => entry.slug === game.slug)) {
      setError("Game Already Exists in List");
    } else {
      setError('');
      await addDoc(collection(db, "games"), game);
      setGame(undefined);
    }
  }

  useEffect(() => {
    const unSubscribe = onSnapshot(
      collection(db, "games"), 
      (collectionSnapshot) => {
        let games : dbGameEntry[] = [];
        collectionSnapshot.forEach((doc) => {
          games.push({
            name: doc.data().name,
            slug: doc.data().slug,
            upvotes: doc.data().upvotes,
            downvotes: doc.data().downvotes,
            metacritic: doc.data().metacritic,
            id: doc.id
          });
        });
        games.sort((a: dbGameEntry, b: dbGameEntry) => {
          if ((a.upvotes - a.downvotes) > (b.upvotes - b.downvotes)) {
            return -1;
          }
          if ((a.upvotes - a.downvotes) < (b.upvotes - b.downvotes)) {
            return 1; 
          }
          return 0;
        })
          setGameArr(games);
      },
      (error) => {
        // do something with error
      }
    );
    return () => unSubscribe();
  }, [addGameToDB]);

  useEffect(() => {
    if (game !== undefined){
      addGameToDB(game);
    }
  }, [game]) 
    
  const addGameToList = (name: string, slug: string, metacritic: number): void => {
    let metaScore: any;
    let userId = user;
    if ( metacritic === null || metacritic === undefined) {
      metaScore = "N/A";
    } else {
      metaScore = metacritic;
    }
    setGame({name: name, slug: slug, upvotes: 1, downvotes: 0, metacritic: metaScore, hasUpvoted: userId});
  }

  return (
    <React.Fragment>
      <div className="toRight">
        <h2 className="search">Search for Games Here</h2>
        {error && <p className="error2">{error}</p>}
        <form className="toCenter" onSubmit={handleFormSubmission}>
          <input 
            type="text"
            name="search"
            placeholder="Search For Games Here"/>
          <button type="submit">Search</button>
        </form>
        <ol>{searchList.map((game, index) => (
            <li key={index}>
              <h3>{game.name}</h3>
              <p className="gameText">Metacritic Score: {game.metacritic}</p>
              <button onClick={() => addGameToList(game.name, game.slug, game.metacritic)}>Add To List</button>
            </li>
          ))}
        </ol>
      </div>
    </React.Fragment>
  )
}

export default SearchForGame