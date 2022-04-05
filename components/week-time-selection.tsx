import { Stack, ToggleButton } from '@mui/material';
import dayjs from 'dayjs';
import { ReactElement, useEffect, useState } from 'react';
import { WeekDay } from '../helper/dayjs-helper';
import { DayAndTime } from '../modules/common/common-types';
import { DaySelectionList } from '../modules/quests/components/day-selection-list';

const timeValues = [
	[1,2,3],
	[4,5,6],
	[7,8,9],
	[10,11,12],
	[13,14,15],
	[16,17,18],
	[19,20,21],
	[22,23,24],
];

interface WeekTimeSelectionProps {
	onChange: (selectedTimes: DayAndTime[]) => void
	values: DayAndTime[]
}

export const WeekTimeSelection = ({onChange, values}: WeekTimeSelectionProps): ReactElement => {
	const [selectedWeekDay, setSelectedWeekDay] = useState<WeekDay>();
	const [selectedTimes, setSelectedTimes] = useState<DayAndTime[]>(values ?? []);

	useEffect(() => {
		const filteredTimes = selectedTimes.filter(x => x.hours.length > 0);
		onChange(filteredTimes);
	}, [onChange, selectedTimes]);

	const mapTimes = (day: string) => {
		const isChecked = (day: string, hour: number) : boolean => {
			const item = selectedTimes.find(x => x.day === day);
			if(item) {
				return item.hours.includes(hour);
			}
			return false;
		};
		
		const toggleHour = (day: string, hour: number) => {
			setSelectedTimes(oldState => {
				const temp = [...oldState];
				const item = selectedTimes.find(x => x.day === day);
				if(item) {
					const index = item.hours.indexOf(hour);
					if(index !== -1) {
						item.hours.splice(index, 1); 
					} else {
						item.hours.push(hour);
					}
				} else {
					temp.push({ day, hours: [hour] });
				}
				return temp;
			});
		};

		return (
			<Stack>
				{timeValues.map((row, i) => (
					<Stack direction='row' gap={1} key={i}>
						{
							row.map((hour, j) => {
								return <ToggleButton 
									color='primary'
									fullWidth 
									value='check'
									key={`${i}${j}`} 
									sx={{marginBottom: 1}} 
									selected={isChecked(day, hour)}
									onClick={() => toggleHour(day, hour)}
								>
									{hour}
								</ToggleButton>;
							})
						}
					</Stack>
				))}
			</Stack>
		);
	};

	const handleHighlightDayItem = (day: WeekDay) : boolean => {
		const item = selectedTimes.find(x =>x.day === timeStampToString(day.date));
		if(item) {
			return item.hours.length > 0;
		}

		return false;
	};

	const timeStampToString = (value: number) : string => {
		return dayjs(value).format('DD.MM.YYYY');
	};

	return(
		<Stack sx={{marginTop: 2}} gap={2}>		
			<DaySelectionList onSelectedDayChanged={setSelectedWeekDay} highlightDayItem={handleHighlightDayItem}/>
			{selectedWeekDay && mapTimes(timeStampToString(selectedWeekDay.date))}
		</Stack>
	);
};