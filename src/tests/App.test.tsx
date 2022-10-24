import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../pages/App";

describe("App page", () => {
	test("should render search button", () => {
		render(<App />);
		expect(screen.getByTestId("search-button")).toBeInTheDocument();
	});
});
