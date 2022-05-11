import "@testing-library/jest-dom";
import rickAndMortyMock from "../rickAndMortyMock.json";
import { getServerSideProps } from "../../pages/rickandmorty";
describe("getServerSideProps", () => {
  const originalFetch = window.fetch;
  let mockFetch: any;

  beforeEach(() => {
    mockFetch = jest.fn();
    window.fetch = mockFetch;
  });

  afterEach(() => {
    window.fetch = originalFetch;
  });

  it("Should call the rick and morty API", async () => {
    mockFetch.mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({ info: { next: null }, results: rickAndMortyMock }),
      });
    });

    const response = await getServerSideProps();

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          characters: rickAndMortyMock,
          next: null,
        },
      })
    );
  });
});
