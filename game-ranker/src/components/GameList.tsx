import React, { ReactElement, useEffect, useState } from "react";
import {dbGameEntry} from "./NewGameEntry";
import { collection, addDoc, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import db from "../firebase";



const GameList : React.FC = () : ReactElement => {
  const [gameList, setGameList] = useState<dbGameEntry[]>([])

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
        setGameList(games);
      },
      (error) => {
        // do something with error
      }
    );
    return () => unSubscribe();
  }, []);

  const deleteEntry = async (id: string) => {
    await deleteDoc(doc(db, "games", id));
  }
  return(
    <React.Fragment>
      <ul>
        {gameList.map((game,index) => (
          <li key= {index}>
            <h3>{game.name}</h3>
            <p>{"Upvotes: " + game.upvotes}</p>
            <p>{"Downvotes: " + game.downvotes}</p>
            <p>{"Metacritic Score: " + game.metacritic}</p>
            <button onClick={() => deleteEntry(game.id!)} >Delete</button>
          </li>
        ))}
      </ul>
    </React.Fragment>
  )
}

export default GameList;