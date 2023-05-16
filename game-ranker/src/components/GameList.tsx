import React, { ReactElement, useEffect, useState } from "react";
import {dbGameEntry} from "./NewGameEntry";
import { collection, addDoc, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
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
        games.sort((a: dbGameEntry, b: dbGameEntry) => {
          if ((a.upvotes - a.downvotes) > (b.upvotes - b.downvotes)) {
            return -1;
          }
          if ((a.upvotes - a.downvotes) < (b.upvotes - b.downvotes)) {
            return 1; 
          }
          return 0;
        })
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

  const upvoteOrDownvoteEntry = async (name: string, slug: string, upvotes: number, downvotes: number, metacritic: number, id: string) => {
    const gameToEdit = {
      name: name,
      slug: slug, 
      upvotes: upvotes, 
      downvotes: downvotes,
      metacritic: metacritic,
      id: id
    }
    const gameRef = doc(db!, "games"!, gameToEdit.id!);
    await updateDoc(gameRef, gameToEdit);
  }


  return (
    <React.Fragment>
      <ul>
        {gameList.map((game,index) => (
          <li key= {index}>
            <h3>{game.name}</h3>
            <p>{"Upvotes: " + game.upvotes + "  "}
            <button onClick={() => upvoteOrDownvoteEntry(game.name, game.slug, (game.upvotes + 1), game.downvotes, game.metacritic, game.id!)} >Upvote</button></p>
            <p>{"Downvotes: " + game.downvotes} <button onClick={() => upvoteOrDownvoteEntry(game.name, game.slug, game.upvotes, (game.downvotes + 1), game.metacritic, game.id!)} >Downvote</button></p>
            <p>{"Metacritic Score: " + game.metacritic}</p>
            <button onClick={() => deleteEntry(game.id!)} >Delete</button>
          </li>
        ))}
      </ul>
    </React.Fragment>
  )
}

export default GameList;