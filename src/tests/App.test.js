import { render, screen } from '@testing-library/react';
import App from '../App';
import NewGame from '../components/NewGame';

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