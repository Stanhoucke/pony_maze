# Pony Maze

This project is my attempt to the [Trustpilot Pony Challenge](https://ponychallenge.trustpilot.com/index.html).  

The aim of the challenge is to help a pony escape a maze guarded by a monster. This React web app allows the user to:
 - Create a new maze by choosing a [My Little Pony character name](https://mylittlepony.hasbro.com/en-gb/characters/ponies), maze dimensions, and difficulty
 - Attempt to escape the maze by moving the pony using buttons or keys, highlight the exit route, or let an algorithm attempt to solve the maze automatically
 - Play again when the pony escapes or is caught by Domokun

## Installation
Install the dependencies and start the server.

```sh
cd pony-maze-app
npm install
npm start
```

### `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
### `npm test`
Launches the test runner in the interactive watch mode.\

## About the Software
- The app was made using React and tested using the React Testing Library
- API calls are made to create a maze, get the maze state, and make moves
- The Styled Components library is used to create a dynamic and responsive representation of the maze
- A Depth-First Search algorithm is used to highlight the pony's route to the maze exit
- This yields the route for the automatic pony movement, triggered by useEffect hooks
