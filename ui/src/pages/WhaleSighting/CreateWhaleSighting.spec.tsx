import {
  render,
  waitFor,
  screen,
  fireEvent,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { CreateWhaleSighting } from "./CreateWhaleSighting";

const MOCK_SPECIES = [
  {
    id: 1,
    species: "Species1",
  },
  {
    id: 2,
    species: "Species2",
  },
];

const MOCK_WHALESIGHTING_REQUEST = {
  latitude: 100,
  longitude: 100,
  description: "Whale Sighting test",
  speciesId: 1,
};

beforeEach(() => {
  globalThis.fetch = jest
    .fn()
    .mockResolvedValueOnce({
      json: jest.fn().mockResolvedValue({ items: MOCK_SPECIES }),
    })
    .mockResolvedValueOnce({
      ok: true,
    });
});

test("Renders Whale Sighting creation form with list of species", async () => {
  render(<CreateWhaleSighting />);

  await waitFor(() => {
    const speciesList = document.querySelector("select") as HTMLSelectElement;
    const options = Array.from(speciesList.options).map(
      (option) => option.text
    );
    expect(options).toContain(MOCK_SPECIES[1].species);
  });
});

test("Submit whale sighting request", async () => {
  render(<CreateWhaleSighting />);

  await waitFor(() => {
    const latitude = screen.getByLabelText(/Latitude/, {
      selector: "input",
    }) as HTMLInputElement;
    const longitude = screen.getByLabelText(/Longitude/, { selector: "input" });
    const description = screen.getByLabelText(/Description/, {
      selector: "input",
    });
    const speciesList = screen.getByLabelText(/Species/, {
      selector: "select",
    }) as HTMLSelectElement;
    const submitButton = document.querySelector("button") as HTMLButtonElement;

    act(() => {
      fireEvent.change(latitude, {
        target: { value: MOCK_WHALESIGHTING_REQUEST["latitude"] },
      });
      fireEvent.change(longitude, {
        target: { value: MOCK_WHALESIGHTING_REQUEST["longitude"] },
      });
      fireEvent.change(description, {
        target: { value: MOCK_WHALESIGHTING_REQUEST["description"] },
      });
      fireEvent.change(speciesList, {
        target: { value: MOCK_WHALESIGHTING_REQUEST["speciesId"] },
      });
      fireEvent.click(submitButton);
    });

    expect(speciesList.value).toBe("1");

    expect(globalThis.fetch).toHaveBeenCalled();
  });
  expect(
    screen.getByText(
      /Your Whale Sighting Has Been Submitted And Is Pending Approval!/
    )
  ).toBeVisible();
});
