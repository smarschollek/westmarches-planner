import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { getNextDays, WeekDay } from '../../../helper/dayjs-helper';
import { DaySelectionItem } from './day-selection-item';


interface DaySelectionListProps {
  onSelectedDayChanged: (day: WeekDay) => void
  highlightDayItem?: (day: WeekDay) => boolean
}

export const DaySelectionList = ({onSelectedDayChanged, highlightDayItem} : DaySelectionListProps): ReactElement => {  
	const days = useMemo(() => getNextDays(dayjs(), 40), []);
	const [selectedDay, setSelectedDay] = useState<WeekDay>(days[0]);

	useEffect(() => {
		onSelectedDayChanged(selectedDay);
	}, [onSelectedDayChanged, selectedDay]);

	const handleOnClick = (value: WeekDay) => {
		setSelectedDay(value);		
	};

	return (
		<Stack direction='row' sx={{
			overflowX: 'auto'
		}}>
			{days.map((day, index) => (
				  <DaySelectionItem 
					key={index} 
					selected={selectedDay.date == day.date}
					highlight={highlightDayItem ? highlightDayItem(day) : false}
					onClick={handleOnClick}
					value={day}/>
			))}
		</Stack>
	);
};
