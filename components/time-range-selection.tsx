import { CheckBox } from '@mui/icons-material';
import { Stack, Typography, Grid, ToggleButton, Switch, FormControlLabel, Slider, Divider } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';
import { DayAndTime } from '../modules/common/common-types';

interface TimeRangeSelectionProps {
    onChange: (values: DayAndTime[]) => void
    values: DayAndTime[]
}

export const TimeRangeSelection = ({onChange, values} : TimeRangeSelectionProps): ReactElement => {
	const [state, setState] = useState<(DayAndTime & {fullDay?: boolean})[]>(values);

	useEffect(() => {
		onChange(state);
	}, [onChange, state]);

	const toggleSwitch = (index: number, checked: boolean) => {
		setState(prevState => {
			const newState = [...prevState];
			newState[index].hours = checked ? [1, 24] : [18, 24];
			newState[index].fullDay = checked;
			return newState;
		});
	};

	const handleChangeSlider = (index: number, value: number | number[]) => {
		setState(prevState => {
			const newState = [...prevState];
			if(Array.isArray(value)) {
				newState[index].hours = value;
			}
			return newState;
		});
	};

	const renderTimeSelection = () => {
		return state.map((x, index) => (
			<Stack key={index} gap={1} sx={{marginTop: 2}}>
				<Stack direction='row' alignItems='center' justifyContent='space-between'>
					{x.day}
					<FormControlLabel control={<Switch checked={x.fullDay} onChange={(_, checked) => toggleSwitch(index, checked)} />} label='All Day' />
				</Stack>
				<Slider valueLabelDisplay='auto' disabled={x.fullDay} aria-label='Volume' min={1} max={24} value={x.hours} onChange={(_, value) => handleChangeSlider(index, value)} />
				<Divider/>
			</Stack>
		));
	};
    
	return(
		<Stack sx={{marginTop: 2}} gap={2}>
			<Typography variant='body1' component='div'>
                Select time range where you can play or mark the day when you can play at any time.
			</Typography>

			<Divider/>

			<Stack>
				{renderTimeSelection()}
			</Stack>
		</Stack>
	);
};