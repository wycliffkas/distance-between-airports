import React from "react";

interface Props {
	loadingDistance: boolean;
	distance: number | null;
}

const Mile = ({ loadingDistance, distance }: Props) => {
	return (
		<div className="content">
			{loadingDistance && <div>Loading...</div>}

			{distance && !loadingDistance &&(
				<div data-testid="distance">
					<strong>Nautical Miles: </strong>
					{distance.toFixed(2)}
				</div>
			)}
		</div>
	);
};

export default Mile;
