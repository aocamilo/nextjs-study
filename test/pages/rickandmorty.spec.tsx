import { render, fireEvent, waitFor } from "@testing-library/react";
import RickAndMorty from "../../pages/rickandmorty";
import "@testing-library/jest-dom";
import rickAndMortyMock from "../rickAndMortyMock.json";
import { Character } from "../../pages/rickandmorty";

describe("When in the rick and morty app", () => {
  const originalFetch = window.fetch;
  let mockFetch: any;

  beforeEach(() => {
    mockFetch = jest.fn();
    window.fetch = mockFetch;
  });

  afterEach(() => {
    window.fetch = originalFetch;
  });

  function renderComponent() {
    const { getByTestId, getAllByTestId, asFragment, getByText } = render(
      <RickAndMorty
        characters={rickAndMortyMock as Character[]}
        next="https://rickandmortyapi.com/api/character?page=2"
      />
    );

    return {
      characters: getAllByTestId("character"),
      filterInput: getByTestId("filter-input-name") as HTMLInputElement,
      resetFilter: getByTestId("reset-filter"),
      fetchNext: getByTestId("fetch-next-page"),
      asFragment,
      getByText,
      getAllByTestId,
    };
  }

  it("It should match the snapshot", () => {
    const { asFragment } = renderComponent();

    expect(asFragment).toMatchSnapshot();
  });

  it("Should display 20 characters", () => {
    const { characters } = renderComponent();

    expect(characters.length).toBe(20);
  });

  it("Should set and clear filter correctly", () => {
    const { filterInput, resetFilter } = renderComponent();

    expect(filterInput.value).toBe("");

    fireEvent.change(filterInput, {
      target: { value: "morty" },
    });

    expect(filterInput.value).toBe("morty");

    fireEvent.click(resetFilter);

    expect(filterInput.value).toBe("");
  });

  it("Should call the API and display error correctly", async () => {
    mockFetch.mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ error: "error..." }),
      });
    });

    const { fetchNext, getByText } = renderComponent();

    fireEvent.click(fetchNext);

    await waitFor(() => {
      expect(getByText("error...")).toBeInTheDocument();
    });
  });
});
