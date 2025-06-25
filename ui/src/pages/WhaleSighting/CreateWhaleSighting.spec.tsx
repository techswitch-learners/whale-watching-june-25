import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CreateWhaleSighting } from "./CreateWhaleSighting";

test('Renders Create Whale Sighting Form', () => {
    const { getByText } = render(<CreateWhaleSighting />);
  const textElement = getByText(/Submit Whale Sighting/i);
  expect(textElement).toBeVisible();
})
