import { Stack, Typography, Switch, FormControlLabel, Slider, Divider } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';
import { DayAndTime } from '../modules/common/common-types';

const converValues = (values: DayAndTime[]) : DayAndTimeAndFlag[] => {
	return values.map(x => ({
		...x,
		fullDay: x.hours[0] === 1 && x.hours[1] === 24
	}));	
};

const minimalDistance = 1;
const keepMinimalDistance = (oldValue: number[], newValue: number[], activeThumb: number) : number[] => {
	if(activeThumb === 0) {
		return [Math.min(newValue[0], oldValue[1] - minimalDistance), oldValue[1]];
	} else {
		return [oldValue[0], Math.max(newValue[1], oldValue[0] + minimalDistance)];
	}
};

type DayAndTimeAndFlag = DayAndTime & {
	fullDay: boolean
}

interface TimeRangeSelectionProps {
    onChange: (values: DayAndTime[]) => void
    values: DayAndTime[]
}

export const TimeRangeSelection = ({onChange, values} : TimeRangeSelectionProps): ReactElement => {
	const [state, setState] = useState<DayAndTimeAndFlag[]>(converValues(values));

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

	const handleChangeSlider = (index: number, value: number | number[], activeThumb: number) => {
		if(!Array.isArray(value)) {
			return; 
		}

		setState(prevState => {
			const newState = [...prevState];
			const oldValue = newState[index].hours;
			newState[index].hours = keepMinimalDistance(oldValue, value, activeThumb);
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
				<Slider 
					valueLabelDisplay='auto' 
					disabled={x.fullDay} 
					aria-label='Hours' 
					min={1} max={24} 
					value={x.hours} 
					onChange={(_, value, activeThumb) => handleChangeSlider(index, value, activeThumb)} 
					disableSwap
				/>
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