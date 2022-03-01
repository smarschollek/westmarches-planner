import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import { createRef, ReactElement, useState } from 'react';
import { Accordion, Button, Col, Row, ToggleButton } from 'react-bootstrap';

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

dayjs.extend(weekOfYear);

export const WeekTimeSelection = (): ReactElement => {
	const [times, setTimes] = useState<{[key: string] : string[]}>({});
	const focusRef = createRef<HTMLElement>();

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

	const renderAccordion = (days : string[]) => {
		return (
			<Accordion defaultActiveKey='0'>
				{days.map((day, i) => {
					return(
						<Accordion.Item eventKey={i.toString()} key={i}>
							<Accordion.Header>{day}</Accordion.Header>
							<Accordion.Body>
								<Row>
									<Col className='d-grid'>
										<Button
											id={'toggle-check-all'}
											variant='light'
											onClick={() => {
												pushTime(day, timeValues.flat());
											}}
										>
								            {times[day] && times[day].length > 0 ? 'Clear' : 'All' }
										</Button>
									</Col>
									<Col/>
									<Col/>
								</Row>
								{mapTimes(day)}
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
											focusRef.current && focusRef.current.focus();
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
    
	console.log(dayjs(dayjs().year(2022)).week(2));

	return(
		<>
			<div ref={focusRef}/>
			{renderAccordion(['KW1', 'KW2', 'KW3', 'KW4', 'KW5', 'KW6','KW7' ])}
		</>
	);
};