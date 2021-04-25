import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import NewGame from './components/NewGame';
import Maze from './components/Maze';

// Tests
test('renders app title', () => {
  render(<App />);
  const title = screen.getByText(/Pony Maze/i);
  expect(title).toBeInTheDocument();
});

test('has new game button', () => {
  render(<NewGame />);
  const newGameButton = screen.getByRole('button', {name: /New Game/i});
  expect(newGameButton).toBeInTheDocument();
})

// test('has move buttons', () => {
//   render(<Maze />);
//   // const newGameButton = screen.getByRole('button', {name: /New Game/i});
//   // fireEvent.click(newGameButton)
// expect(screen.getByRole('button', {name: /Goofy/i})).toBeInTheDocument();
//   waitFor(() => expect(screen.getByRole('button', {name: /Left/i})).toBeInTheDocument());
//   waitFor(() => expect(screen.getByRole('button', {name: /Up/i})).toBeInTheDocument());
//   waitFor(() => expect(screen.getByRole('button', {name: /Down/i})).toBeInTheDocument());
// })