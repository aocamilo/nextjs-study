import { render } from "@testing-library/react";
import Home from "../../pages/index";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("renders a use nav text", () => {
    const { getByText } = render(<Home />);
    const expectedText =
      "This is an app made to study and understand some concepts about Nextjs, SSR, SSG, CSR, and more... Please use the nav.";
    expect(getByText(expectedText)).toBeInTheDocument();
  });
});
