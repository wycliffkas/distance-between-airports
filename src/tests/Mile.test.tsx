import React from "react";
import { render, screen } from "@testing-library/react";
import Mile from "../components/Mile";

describe("Mile component", () => {
	test("should render loading when fetching distance", () => {
		render(<Mile loadingDistance distance={234.5677988} />);
		const element = screen.getByText(/loading/i);
		expect(element).toBeInTheDocument();
	});

	test("shouldn't render distance while loading", () => {
		render(<Mile loadingDistance distance={234.5677988} />);
		const element = screen.queryByTestId("distance");
		expect(element).not.toBeInTheDocument();
	});

	test("should render correct distance", () => {
		render(<Mile loadingDistance={false} distance={234.5677988} />);
		const element = screen.getByText(/234.57/i);
		expect(element).toBeInTheDocument();
	});
});
