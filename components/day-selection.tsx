import { Grid, Stack, ToggleButton, Typography } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';

interface DaySelectionProps {
    onChange : (values : string[]) => void
    values: string[]
}

const getNextThirtyDays = () : string[] => {
	var today = new Date();

	var year = today.getFullYear();
	var month = today.getMonth();
	var date = today.getDate();

	const result : string[] = [];

	for(var i=1; i<30; i++){
		var day = new Date(year, month, date + i);
		result.push(day.toDateString());
	}

	return result;
};

const dates = getNextThirtyDays();

export const DaySelection = ({onChange, values} : DaySelectionProps): ReactElement => {
	const [selectedValues, setSelectedValues] = useState<string[]>(values);

	useEffect(() => {
		if(values !== selectedValues) {
			onChange(selectedValues);
		}
	}, [onChange, selectedValues, values]);

	const handleOnClick = (value : string) => {
		setSelectedValues(prevState => {
			const newState = [...prevState];
			const index = newState.findIndex(x => x === value);
			if(index === -1) {
				newState.push(value);
			} else {
				newState.splice(index, 1);
			}

			return newState;
		});
	};
    
	return(
		<Stack sx={{marginTop: 2}} gap={2}>
			<Typography variant='body1' component='div'>
                Select the days you can play. In the next step you can then specify the time range
                for each selected day.
			</Typography>

			<Grid container spacing={2} columns={3}>
				{dates.map(x => (
					<Grid item key={x} xs={1}>
						<ToggleButton
							fullWidth
							color='primary'
							selected={selectedValues.includes(x)}
							value={x}
							onClick={() => handleOnClick(x)}
						>
							{x}
						</ToggleButton>
					</Grid>
				
				))}
			</Grid>
		</Stack>
	);
};