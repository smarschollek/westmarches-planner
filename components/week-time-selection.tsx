import dayjs from 'dayjs';
import { ReactElement, useEffect, useState } from 'react';
import { Accordion, Button, Col, Dropdown, Form, Row, Stack } from 'react-bootstrap';
import { CalenderWeek, getCalenderWeeks, getCurrentWeek, getWeekDays } from '../helper/dayjs-helper';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons';

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

export const WeekTimeSelection = (): ReactElement => {
	const [times, setTimes] = useState<{[key: string] : string[]}>({});
	const [weeks, setWeeks] = useState<CalenderWeek[]>([]);
	const [selectedWeek, setSelectedWeek] = useState<CalenderWeek>();

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
										onClick={() => pushTime(day, [col])}
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

	return(
		<Stack>
			<Dropdown className='d-grid mb-2'>
				<Dropdown.Toggle id='dropdown-basic'>
					<span className='overflow-hidden'>
						<FontAwesomeIcon icon={faCalendarAlt}/>
						<span className='mx-3'>{`${selectedWeek.name}, ${dayjs(selectedWeek.start).format('MM/D/YYYY')} - ${dayjs(selectedWeek.stop).format('MM/D/YYYY')}`}</span>
					</span>
				</Dropdown.Toggle>

				<Dropdown.Menu className='w-100 overflow-auto' style={{maxHeight: '250px'}}>
					{weeks.map(week => {
						return <Dropdown.Item disabled={dayjs(week.stop).isBefore(dayjs())} onClick={() => setSelectedWeek(week)} key={week.weekIndex}>{`${week.name} # ${week.start.toDateString()} - ${week.stop.toDateString()}`}</Dropdown.Item>;
					})}
				</Dropdown.Menu>
			</Dropdown>
			{renderAccordion(getWeekDays(selectedWeek.weekIndex))}
		</Stack>
	);
};