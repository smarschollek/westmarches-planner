import { Grid, Stack, ToggleButton } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';

interface TimeSelectionProps {
    values: number[]
    onSelectionChanged?: (values : number[]) => void
}

export const TimeSelection = ({values, onSelectionChanged} : TimeSelectionProps ): ReactElement => {
	const [selectedValues, setSelectedValues] = useState<number[]>([]);
    
	useEffect(() => {
		setSelectedValues([]);
		onSelectionChanged && onSelectionChanged([]);
	}, [onSelectionChanged, values]);

	const handleOnClick = (value: number) => {
		setSelectedValues(lastState => {
			const temp = [...lastState];
			const index = temp.indexOf(value);
			if(index !== -1) {
				temp.splice(index, 1);
			} else {
				temp.push(value);
			}

			const result = temp.sort((a,b) => (a - b));
			onSelectionChanged && onSelectionChanged(result);
			return result;
		});
	};

	return(
		<Grid container spacing={2} columns={3}>
			{values.map(x => (
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
	);
};