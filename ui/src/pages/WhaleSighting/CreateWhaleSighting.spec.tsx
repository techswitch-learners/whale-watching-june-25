import { render} from '@testing-library/react';
import '@testing-library/jest-dom';
import { CreateWhaleSighting } from "./CreateWhaleSighting";

const MOCK_SPECIES = ["Humpback Whale", "Blue Whale"];


test('Renders Whale Sighting creation form with list of species', async () => {
    globalThis.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValue(MOCK_SPECIES),
      });
 
    const { getByText } = await render(<CreateWhaleSighting />);
    const textElement = await getByText(/Submit Whale Sighting/i);
    await globalThis.fetch;
    expect(textElement).toBeVisible();
    expect(globalThis.fetch).toHaveBeenCalled();
    const speciesList = document.querySelector("select") as HTMLSelectElement;
    const options = Array.from(speciesList.options).map(option => option.text);
    expect(options).toContain(MOCK_SPECIES[1]);    
});

