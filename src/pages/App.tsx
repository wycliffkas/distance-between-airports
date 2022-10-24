import React, { useRef, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import "../App.css";
import InputField from "../components/InputField";
import Mile from "../components/Mile";

function App() {
	const [options, setOptions] = useState([]);

	const [arrivalAirport, setArrivalAirport] = useState<string | null>(null);

	const [departureAirport, setDepartureAirport] = useState<string | null>(null);

	const [distance, setDistance] = useState<number | null>(null);

	const [loadingAirport, setLoadingAirport] = useState(false);

	const [loadingDistance, setLoadingDistance] = useState(false);

	const previousController = useRef<AbortController | null>();

	const getAirport = (searchTerm: string) => {
		if (previousController.current) {
			previousController.current.abort();
		}

		const controller = new AbortController();

		const signal = controller.signal;

		previousController.current = controller;

		setLoadingAirport(true);

		fetch(
			"https://airport.globefeed.com/autoairport.asp?cc=US&q=" + searchTerm,
			{
				signal
			}
		)
			.then((response) => {
				setLoadingAirport(false);
				return response.json();
			})
			.then((data) => setOptions(data))
			.catch((error) => {
				setLoadingAirport(false);
				console.log(error);
			});
	};

	const getDistBetweenAirports = () => {
		setLoadingDistance(true);
		fetch(
			`https://airportgap.dev-tester.com/api/airports/distance?from=${departureAirport}&to=${arrivalAirport}`,
			{ method: "POST" }
		)
			.then((response) => {
				setLoadingDistance(false);
				return response.json();
			})
			.then((result) =>
				setDistance(Number(result.data.attributes.nautical_miles))
			)
			.catch((error) => console.log(error));
	};

	const handleInputChange = (value: string) => {
		if (value) {
			getAirport(value);
		} else {
			setDistance(null);
			setOptions([]);
		}
	};

	return (
		<div>
			<h3 className="heading">Distance Between Airports in USA</h3>

			<Card className="card">
				<CardContent>
					<InputField
						options={options}
						loading={loadingAirport}
						onInputChange={handleInputChange}
						setLoading={setLoadingAirport}
						setAirport={setDepartureAirport}
						placeholder="Departure Airport"
					/>

					<InputField
						options={options}
						loading={loadingAirport}
						onInputChange={handleInputChange}
						setLoading={setLoadingAirport}
						setAirport={setArrivalAirport}
						placeholder="Arrival Airport"
					/>

					<Button
						variant="contained"
						onClick={getDistBetweenAirports}
						data-testid="search-button">
						Find Distance Between Airports
					</Button>
				</CardContent>
			</Card>

			<Mile loadingDistance={loadingDistance} distance={distance} />
		</div>
	);
}

export default App;
