import React, { ReactElement, useEffect, useState } from "react";
import {dbGameEntry} from "./Interfaces";
import { collection, onSnapshot, deleteDoc, doc, updateDoc } from "firebase/firestore";
import db from "../firebase";

interface gameListProps {
  user: string
}

const GameList : React.FC<gameListProps> = ({user}) : ReactElement => {
  const [gameList, setGameList] = useState<dbGameEntry[]>([])
  const [ error, setError ] = useState('');
  const [ count, setCount ] = useState(0);

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
            hasDownvoted: doc.data().hasDownvoted,
            hasUpvoted: doc.data().hasUpvoted,
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
        let uniqueArr: dbGameEntry[] = Array.from(new Set(games.map(a => a.slug)))
          .map(slug => {
            return games.find(a => a.slug === slug)!;
          })
        setGameList(uniqueArr);
      },
      (error) => {
        // do something with error
      }
    );
    return () => unSubscribe();
  }, [setCount]);

  const deleteEntry = async (id: string) => {
    await deleteDoc(doc(db, "games", id));
  }

  
  const upvoteEntry = async (name: string, slug: string, upvotes: number, downvotes: number, metacritic: number | string, hasUpvoted: string, hasDownvoted: string, id: string) => {
    let upvoteName: string = hasUpvoted;
    let downvoteName: string = hasDownvoted;
    let addUpvote: number = 0;
    if (hasDownvoted === '' || hasDownvoted === undefined) {
      downvoteName = "None Have Upvoted"
    } else {
      downvoteName = hasDownvoted;
    }
    if (hasUpvoted === '' || hasUpvoted === undefined || hasUpvoted === "None Have Downvoted") {
      console.log("scenario1")
      upvoteName = user;
    } else if (hasUpvoted === "None Have Voted") {
      addUpvote = 1;
      upvoteName = user;
    } else if (!hasUpvoted.includes(user) ){
      addUpvote = 1;
      upvoteName = hasUpvoted + user;
    } else if (hasUpvoted.includes(user) || hasUpvoted === user ){
      setError(`You have already upvoted ${name}`)
    }
    const gameToEdit = {
    name: name,
    slug: slug, 
    upvotes: upvotes + addUpvote, 
    downvotes: downvotes,
    metacritic: metacritic,
    hasUpvoted: upvoteName,
    hasDownvoted: downvoteName,
    id: id
    } 
    const gameRef = doc(db!, "games"!, gameToEdit.id!);
    await updateDoc(gameRef, gameToEdit)
    setCount(count + 1);    
}

  
  const downvoteEntry = async (name: string, slug: string, upvotes: number, downvotes: number, metacritic: number | string, hasUpvoted: string, hasDownvoted: string, id: string) => {
    let upvoteName: string = hasUpvoted;
    let downvoteName: string = hasDownvoted;
    let addDownvote: number = 0;
    console.log(hasDownvoted)
    if (hasUpvoted === '' || hasUpvoted === undefined) {
      upvoteName = "None Have Upvoted"
    } else {
      upvoteName = hasUpvoted;
    }
    if (hasDownvoted === '' || hasDownvoted === undefined || hasDownvoted === "None Have Downvoted") {
      console.log("scenario1")
      downvoteName = user;
    } else if (hasDownvoted === "None Have Voted") {
      console.log("scenario2");
      addDownvote = 1;
      downvoteName = user;
    } else if (!hasDownvoted.includes(user) ){
      console.log("scenario3");
      addDownvote = 1;
      downvoteName = hasDownvoted + user;
    } else if (hasDownvoted.includes(user) || hasDownvoted === user ){
      console.log("blocked");
      setError(`You have already downvoted ${name}`)
    }
    const gameToEdit = {
    name: name,
    slug: slug, 
    upvotes: upvotes, 
    downvotes: downvotes + addDownvote,
    metacritic: metacritic,
    hasUpvoted: upvoteName,
    hasDownvoted: downvoteName,
    id: id
    } 
    const gameRef = doc(db!, "games"!, gameToEdit.id!);
    await updateDoc(gameRef, gameToEdit)
    setCount(count + 1);    
    console.log(count);
    console.log(error);

}

  if (user !== "nfiZ9mjNwFYBEqcB7FRqNnvjx6j2") {
    return (
      <React.Fragment>
        <div className="toLeft">
          <h2 className="toCenter">Games to Consider</h2>
          {error && <p className="error2">{error}</p>}
          <ul >
          {gameList.map((game,index) => (
            <li key= {index}>
              <h3>{game.name}</h3>
              <p className="gameText">{"Upvotes: " + game.upvotes + "  "}
              <button onClick={() => upvoteEntry(game.name, game.slug, (game.upvotes + 1), game.downvotes, game.metacritic, game.hasUpvoted!, game.hasDownvoted!, game.id!)} >Upvote</button></p>
              <p className="gameText">{"Downvotes: " + game.downvotes} <button onClick={() => downvoteEntry(game.name, game.slug, game.upvotes, (game.downvotes), game.metacritic, game.hasUpvoted!, game.hasDownvoted!, game.id!)} >Downvote</button></p>
              <p className="gameText">{"Metacritic Score: " + game.metacritic}</p>
            </li>
          ))}
          </ul>
        </div>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <div className="toLeft">
          <h2 className="toCenter">Games to Consider</h2>
          {error && <p className="error2">{error}</p>}
          <ol>
            {gameList.map((game,index) => (
              <li key= {index}>
                <h3>{game.name}</h3>
                <p className="gameText">{"Upvotes: " + game.upvotes + "  "}
                <button onClick={() => upvoteEntry(game.name, game.slug, (game.upvotes), game.downvotes, game.metacritic, game.hasUpvoted!, game.hasDownvoted!, game.id!)} >Upvote</button></p>
                <p className="gameText">{"Downvotes: " + game.downvotes} <button onClick={() => downvoteEntry(game.name, game.slug, game.upvotes, game.downvotes, game.metacritic, game.hasUpvoted!, game.hasDownvoted!, game.id!)} >Downvote</button></p>
                <p className="gameText">{"Metacritic Score: " + game.metacritic}</p>
                <button onClick={() => deleteEntry(game.id!)} >Delete</button>
              </li>
            ))}
          </ol>
        </div>
      </React.Fragment>
    )
  }
}

export default GameList;