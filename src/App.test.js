import { render, screen } from '@testing-library/react';
import TasksScene from './client/scenes/Tasks.scene';

test('renders learn react link', () => {
  render(<TasksScene />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
