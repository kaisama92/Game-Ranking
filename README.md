# _GG Rankings_

#### By _**Kai Clausen**_

#### _An application for groups to figure out what they want to play_

## Technologies Used

* _HTML_
* _TypeScript_
* _CSS_
* _RAWG API_
* _Firebase_
* _Firestore_
* _JavaScript_
* _Create-React-App_

## Description

_This application interfaces with RAWG's Api to pull information from their database based on a search string entered by the user, plus some behind the scenes parameters. Then users can add the games to the game list where they can choose to upvote or downvote list items. Each game is restricted to 1 upvote or downvote each. Also only the site admin can delete entries from the website. Created as my Capstone for Epicodus._

## Setup/Installation Requirements

_This application is deployed at https://gamerankings-d45f4.web.app_

_Alternatively you can set this project up on your computer by following these instructions:_
_(Please Note that you will need to set up an account with RAWG to gain access to an API key. You will also need to set up a firebase application. Follow the instructions at https://www.learnhowtoprogram.com/react. Specifically lessons 7, 9, 11, 21, 22 will give you a great place to start.)_

* _Make sure you have your api key and have a firebase application set up_
* _Clone this repository to you computer_
* _In the ```game-ranker``` directory, enter the command ```npm install```_
* _Then enter the command ```npm run build```_
* _In the same directory create a file called .env_
* _In .env you will want to enter the following :_
```cs 
  REACT_APP_API_KEY = YOUR_API_KEY
  REACT_APP_USER_ID = YOUR_REACT_APP_USER_ID

  # Firebase Environmentals
  REACT_APP_FIREBASE_API_KEY = YOUR_FIREBASE_API_KEY
  REACT_APP_FIREBASE_AUTH_DOMAIN = YOUR_FIREBASE_AUTH_DOMAIN
  REACT_APP_FIREBASE_PROJECT_ID = YOUR_FIREBASE_PROJECT_ID
  REACT_APP_FIREBASE_STORAGE_BUCKET = YOUR_FIREBASE_STORAGE_BUCKET
  REACT_APP_FIREBASE_MESSAGING_SENDER_ID = YOUR_FIREBASE_MESSAGING_SENDER_ID 
  REACT_APP_FIREBASE_APP_ID = YOUR_FIREBASE_APP_ID 
  ```

* _Replace all sections startincg with ```YOUR``` with your own information as noted in the lessons._
* _The ```REACT_APP_USER_ID``` value will correspond with your uid that has been stored in your authentication db._
* _To do that, run ```npm start``` and register an account. Firebase will auto generate the uid and store it._ 
* _After that has been completed the application is completely functional_


## Preview: 
![Preview of Site](./game-ranker/public/GGRankingsPreview.png?raw=true "Title")

## Known Bugs

* _No warning for nsfw entries from the search list_

## License

_MIT - If you come across any issues, feel free to fix them yourself, or contact Kai @ kaiclausen123@gmail.com_

Copyright (c) _2023_ _Kai Clausen_