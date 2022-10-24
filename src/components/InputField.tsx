import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

import { Option } from "../constants/Types";

interface Props {
	options: Option[];
	onInputChange: (value: string) => void;
	loading: boolean;
	setLoading: (value: boolean) => void;
	setAirport: (value: string) => void;
	placeholder: string;
}

const InputField = ({
	options,
	onInputChange,
	loading,
	setLoading,
	setAirport,
	placeholder
}: Props) => {
	return (
			<Autocomplete
				options={options}
				onInputChange={(
					event: React.SyntheticEvent<Element, Event>,
					value: string
				) => onInputChange(value)}
				onChange={(event: any, newValue: Option | null) => {
					setLoading(true);
					const value = newValue?.iata;
					setAirport(value!);
				}}
				loading={loading}
				getOptionLabel={(option: Option) => option?.name}
				renderInput={(params) => (
					<TextField {...params} placeholder={placeholder} variant="outlined" />
				)}
				fullWidth
        sx={{ my: 2 }}
			/>
	);
};

export default InputField;
