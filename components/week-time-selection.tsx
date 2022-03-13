import { ChevronLeft, ChevronRight, ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Button, FormControl, InputLabel, MenuItem, Select, Stack, ToggleButton, Typography } from '@mui/material';
import { time } from 'console';
import dayjs from 'dayjs';
import { ReactElement, useEffect, useState } from 'react';
import { CalenderWeek, getCalenderWeeks, getCurrentWeek, getWeekDays } from '../helper/dayjs-helper';
import { DayAndTime } from '../modules/common/common-types';

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
	const [times, setTimes] = useState<DayAndTime[]>(values);
	const [weeks, setWeeks] = useState<CalenderWeek[]>([]);
	const [selectedWeek, setSelectedWeek] = useState<CalenderWeek>();
	const [expanded, setExpanded] = useState<string | false>(false);

	useEffect(() => {
		const storedTimes = times.sort((a,b) => (Date.parse(a.day) - Date.parse(b.day)));
		onChange(storedTimes);
	}, [onChange, times]);

	useEffect(() => {
		const weeks = getCalenderWeeks();
		setWeeks(weeks);
		setSelectedWeek(weeks[getCurrentWeek()]);
	}, []);

	const pushTime = (day: string, hours: number[]) => {
		const temp = [...times];

		if(hours.length === 1) {
			const item = temp.find(x => x.day === day); 
			if(item) {
				const index = item.hours.indexOf(hours[0]);
				if(index !== -1) {
					item.hours.splice(index, 1);
				} else {
					item.hours.push(hours[0]);
				}
				
			} else {
				temp.push({
					day,
					hours
				});
			}
		} else {
			const index = temp.findIndex(x => x.day === day); 
			if(index !== -1) {
				temp.splice(index, 1);
			} else {
				temp.push({
					day,
					hours
				});
			}
		}

		setTimes(temp);
	}; 

	const prevWeek = () => {
		if(selectedWeek) {
			const index = weeks.indexOf(selectedWeek);
			if(index > 0) {
				setSelectedWeek(weeks[index-1]);
				setExpanded(false);
			}
		}
	};

	const nextWeek = () => {
		if(selectedWeek) {
			const index = weeks.indexOf(selectedWeek);
			if(index < weeks.length - 1) {
				setSelectedWeek(weeks[index+1]);
				setExpanded(false);
			}
		}
	};

	const isChecked = (day: string, hour: number) => {
		const item = times.find(x => x.day === day);
		if(item) {
			if(hour === -1) {
				return true;
			}

			return item.hours.includes(hour);
		} 

		return false;
	};

	const renderAccordion = (days : Date[]) => {
		const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    		setExpanded(newExpanded ? panel : false);
   		};

		return (
			<>
				{
					days.map((day, index) => {
						const dayString = day.toDateString();
						if(dayjs(day).valueOf() < (dayjs().valueOf())) {
							return (
								<Accordion key={index} disabled disableGutters expanded={false}>
									<AccordionSummary  aria-controls={`panel-healder-${index}`} id={`panel-healder-${index}`}>
										<Typography>{dayString}</Typography>
									</AccordionSummary>		
								</Accordion>
							);
						}	

						return (
							<Accordion key={index} disableGutters expanded={expanded == dayString} onChange={handleChange(dayString)}>
								<AccordionSummary  expandIcon={<ExpandMore />} aria-controls={`panel-healder-${index}`} id={`panel-healder-${index}`}>
									<Typography>{dayString}</Typography>
        						</AccordionSummary>		
								<AccordionDetails>
									<Button
										id={'toggle-check-all'}
										variant='outlined'
										fullWidth
										onClick={() => {
											pushTime(dayString, timeValues.flat());
										}}
										sx={{marginBottom: 2}}
									>
								            {isChecked(dayString, -1) ? 'Clear' : 'All' }
									</Button>
									{mapTimes(dayString)}
        						</AccordionDetails>
							</Accordion>
						);
					})
				}
			</>
		);
	};

	const mapTimes = (day: string) => {
		return timeValues.map((row, i) => {
			return (
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
								onClick={() => pushTime(day, [hour])}
							>
								{hour}
							</ToggleButton>;
						})
					}
				</Stack>
			);
		});
	};
    
	if(!weeks || !selectedWeek) {
		return <></>;
	}

	const renderDropdownValue = (item: CalenderWeek) : string => {
		return `${item.name}, ${dayjs(item.start).format('MM/D/YYYY')} - ${dayjs(item.stop).format('MM/D/YYYY')}`;
	};

	return(
		<Stack sx={{marginTop: 2}}>		
			<Stack direction='row' sx={{marginBottom: 2}}>
				<Button variant='outlined' color='secondary' onClick={prevWeek}>
					<ChevronLeft/>	
				</Button>
				<FormControl fullWidth sx={{borderRadius: 0}}>
					<Select
						labelId='demo-simple-select-label'
						id='demo-simple-select'
						value={renderDropdownValue(selectedWeek)}
						placeholder='asd'
						MenuProps={{
							sx: {
								maxHeight: '500px'
							}
						}}
					>
						{weeks.map(week => {
							return (
								<MenuItem 
									value={renderDropdownValue(week)}
									disabled={dayjs(week.stop).isBefore(dayjs())} 
									onClick={() => setSelectedWeek(week)} 
									key={week.weekIndex}
								>
									{renderDropdownValue(week)}
								</MenuItem>
							);
						})}
					</Select>
				</FormControl>
				<Button variant='outlined' color='secondary' onClick={nextWeek}>
					<ChevronRight/>
				</Button>
			</Stack>

			{renderAccordion(getWeekDays(selectedWeek.weekIndex))}
		</Stack>
	);
};