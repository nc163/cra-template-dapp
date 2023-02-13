import { render, screen } from '@testing-library/react';
import Dapp from './Aapp';

test('renders learn react link', () => {
  render(<Dapp />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
