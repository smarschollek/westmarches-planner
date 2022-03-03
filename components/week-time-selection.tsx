import dayjs from 'dayjs';
import { ReactElement, useEffect, useState } from 'react';
import { Accordion, Button, ButtonGroup, Col, Dropdown, Form, Row, Stack } from 'react-bootstrap';
import { CalenderWeek, getCalenderWeeks, getCurrentWeek, getWeekDays } from '../helper/dayjs-helper';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarAlt, faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';

const timeValues = [
	['1:00', '2:00', '3:00'],
	['4:00', '5:00', '6:00'],
	['7:00', '8:00', '9:00'],
	['10:00', '11:00', '12:00'],
	['13:00', '14:00', '15:00'],
	['16:00', '17:00', '18:00'],
	['19:00', '20:00', '21:00'],
	['22:00', '23:00', '00:00'],
];

export type SelectedTimes = {[key: string] : string[]};

interface WeekTimeSelectionProps {
	onChange: (selectedTimes: SelectedTimes) => void
	values: SelectedTimes
}

export const WeekTimeSelection = ({onChange, values}: WeekTimeSelectionProps): ReactElement => {
	const [times, setTimes] = useState<SelectedTimes>(values);
	const [weeks, setWeeks] = useState<CalenderWeek[]>([]);
	const [selectedWeek, setSelectedWeek] = useState<CalenderWeek>();

	useEffect(() => {
		onChange(times);
	}, [onChange, times]);

	useEffect(() => {
		const weeks = getCalenderWeeks();
		setWeeks(weeks);
		setSelectedWeek(weeks[getCurrentWeek()]);
	}, []);

	const pushTime = (day: string, values: string[]) => {
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

		setTimes(temp);
	}; 

	const prevWeek = () => {
		if(selectedWeek) {
			const index = weeks.indexOf(selectedWeek);
			if(index > 0) {
				setSelectedWeek(weeks[index-1]);
			}
		}
	};

	const nextWeek = () => {
		if(selectedWeek) {
			const index = weeks.indexOf(selectedWeek);
			if(index < weeks.length - 1) {
				setSelectedWeek(weeks[index+1]);
			}
		}
	};

	const renderAccordion = (days : Date[]) => {
		return (
			<Accordion>
				{days.map((day, i) => {
					
					if(dayjs(day).isBefore(dayjs())) {
						return(
							<Accordion.Item eventKey={i.toString()} key={i}>
								<Accordion.Header className='text-decoration-line-through opacity-50' onClick={() => {}}>{day.toDateString()}</Accordion.Header>
							</Accordion.Item>
						);
					}
					
					return(
						<Accordion.Item eventKey={i.toString()} key={i}>
							<Accordion.Header>{day.toDateString()}</Accordion.Header>
							<Accordion.Body>
								<Row key='-1'>
									<Col className='d-grid'>
										<Button
											id={'toggle-check-all'}
											variant='light'
											onClick={() => {
												pushTime(day.toDateString(), timeValues.flat());
											}}
										>
								            {times[day.toDateString()] && times[day.toDateString()].length > 0 ? 'Clear' : 'All' }
										</Button>
									</Col>
									<Col/>
									<Col/>
								</Row>
								{mapTimes(day.toDateString())}
							</Accordion.Body>
						</Accordion.Item>
					);
				})}
			</Accordion>
		);
	};

	const mapTimes = (day: string) => {
		return timeValues.map((row, i) => {
			return (
				<>
					<Row key={i} className='my-2'>
						{row.map((col, j) => {
							return (
								<Col key={j} className='d-grid'>
							        <Button
										id={`toggle-check-${col}`}
										variant={times[day] && times[day].includes(col) ? 'dark' : 'light'}
										onClick={() => {
											pushTime(day, [col]);
										}}
									>
										{col}
									</Button>
						    </Col>
							);
						})}
					</Row>
				</>
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
		<Stack>
			<Dropdown className='d-grid mb-2'>
				<ButtonGroup>
					<Button onClick={prevWeek} variant='outline-primary'>
						<FontAwesomeIcon icon={faAngleLeft}/>
					</Button>
					<Dropdown.Toggle variant='outline-primary' id='dropdown-basic' className='d-flex justify-content-center align-items-center p-0' style={{fontSize: '0.9rem', borderRadius: 0}}>
						<FontAwesomeIcon icon={faCalendarAlt}/>
						<span className='ms-2'>{renderDropdownValue(selectedWeek)}</span>
					</Dropdown.Toggle>
					<Button onClick={nextWeek} variant='outline-primary'>
						<FontAwesomeIcon icon={faAngleRight}/>
					</Button>
				</ButtonGroup>

				<Dropdown.Menu className='overflow-auto' style={{maxHeight: '250px'}}>
					{weeks.map(week => {
						return (
							<Dropdown.Item disabled={dayjs(week.stop).isBefore(dayjs())} onClick={() => setSelectedWeek(week)} key={week.weekIndex}>
								{renderDropdownValue(week)}
							</Dropdown.Item>
						);
					})}
				</Dropdown.Menu>
			</Dropdown>
			{renderAccordion(getWeekDays(selectedWeek.weekIndex))}
		</Stack>
	);
};