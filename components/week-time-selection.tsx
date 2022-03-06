import { ChevronLeft, ChevronRight, ExpandMore } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Button, FormControl, InputLabel, MenuItem, Select, Stack, ToggleButton, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { ReactElement, useEffect, useState } from 'react';
import { CalenderWeek, getCalenderWeeks, getCurrentWeek, getWeekDays } from '../helper/dayjs-helper';

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

export type SelectedTimes = {[key: string] : number[]};

interface WeekTimeSelectionProps {
	onChange: (selectedTimes: SelectedTimes) => void
	values: SelectedTimes
}

export const WeekTimeSelection = ({onChange, values}: WeekTimeSelectionProps): ReactElement => {
	const [times, setTimes] = useState<SelectedTimes>(values);
	const [weeks, setWeeks] = useState<CalenderWeek[]>([]);
	const [selectedWeek, setSelectedWeek] = useState<CalenderWeek>();
	const [expanded, setExpanded] = useState<string | false>(false);

	useEffect(() => {
		const keys = Object.keys(times);		
		keys.forEach(key => times[key].sort((a,b) => (a-b)));
		onChange(times);
	}, [onChange, times]);

	useEffect(() => {
		const weeks = getCalenderWeeks();
		setWeeks(weeks);
		setSelectedWeek(weeks[getCurrentWeek()]);
	}, []);

	const pushTime = (day: string, values: number[]) => {
		const temp = {...times};
		
		if(values.length === 1) {
			const value = values[0];
			if(temp[day]) {
				const index = temp[day].indexOf(value);
				if(index === -1) {
					temp[day].push(value);
				} else {
					temp[day].splice(index, 1);
				}
			} else {
				temp[day] = [value];
			}
		} else {
			if(temp[day] && temp[day].length !== 0) {
				temp[day] = [];
			} else {
				temp[day] = values;
			}
		}

		if(temp[day].length === 0) {
			delete temp[day];
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

	const renderAccordion = (days : Date[]) => {
		const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    	setExpanded(newExpanded ? panel : false);
   		 };
		return (
			<>
				{
					days.map((day, index) => {
						if(dayjs(day).valueOf() < (dayjs().valueOf())) {
							return (
								<Accordion key={index} disabled disableGutters expanded={false}>
									<AccordionSummary  aria-controls={`panel-healder-${index}`} id={`panel-healder-${index}`}>
										<Typography>{day.toDateString()}</Typography>
									</AccordionSummary>		
								</Accordion>
							);
						}	

						return (
							<Accordion key={index} disableGutters expanded={expanded == `${day.toDateString()}`} onChange={handleChange(`${day.toDateString()}`)}>
								<AccordionSummary  expandIcon={<ExpandMore />} aria-controls={`panel-healder-${index}`} id={`panel-healder-${index}`}>
									<Typography>{day.toDateString()}</Typography>
        						</AccordionSummary>		
								<AccordionDetails>
									<Button
										id={'toggle-check-all'}
										variant='outlined'
										fullWidth
										onClick={() => {
											pushTime(day.toDateString(), timeValues.flat());
										}}
										sx={{marginBottom: 2}}
									>
								            {times[day.toDateString()] && times[day.toDateString()].length > 0 ? 'Clear' : 'All' }
									</Button>
									{mapTimes(day.toDateString())}
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
						row.map((col, j) => {
							return <ToggleButton 
								color='primary'
								fullWidth 
								value='check'
								key={`${i}${j}`} 
								sx={{marginBottom: 1}} 
								selected={times[day] && times[day].includes(col) ? true : false}
								onClick={() => pushTime(day, [col])}
							>
								{col}
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