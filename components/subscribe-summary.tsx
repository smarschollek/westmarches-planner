import { ReactElement } from 'react';
import { Col, Row, Stack } from 'react-bootstrap';
import { groupTimes } from '../helper/dayjs-helper';
import { Quest } from '../models/quest-model';
import { Character } from '../models/user-model';
import { SelectedTimes } from './week-time-selection';

interface SubscribeSummaryProps {
	quest?: Quest
	character?: Character
	times?: SelectedTimes
}

export const SubscribeSummary = ({quest, character, times}: SubscribeSummaryProps): ReactElement => {
	
	const mapTimes = () => {
		if(!times) {
			return <></>;
		}

		const keys = Object.keys(times).sort((a,b) => (new Date(a).getTime() - new Date(b).getTime()));
		return keys.map(key => {
			const values = groupTimes(times[key]);
			return (
				<Row key={key}>
					<Col className='fw-light'>{key}</Col>
					<Col>
						{values.map((v,i) => <div key={i}>{`${v[0]}:00 - ${v[1]}:00`}</div>)}
					</Col>
				</Row>
			);
		});
	};
	
	return(
		<Stack style={{fontSize: '0.9rem'}}>
			<div className='border-bottom mb-1'>
				<b> Quest </b>
			</div>
			<Row>
				<Col className='fw-light'>Name</Col>
				<Col>{quest?.name}</Col>
			</Row>

			<div className='border-bottom mt-2 mb-1'>
				<b> Character </b>
			</div>
			<Row>
				<Col className='fw-light'>Name</Col>
				<Col>{character?.name}</Col>
			</Row>
			<Row>
				<Col className='fw-light'>Class</Col>
				<Col>{character?.class}</Col>
			</Row>
			<Row>
				<Col className='fw-light'>Level</Col>
				<Col>{character?.level}</Col>
			</Row>

			<div className='border-bottom mt-2 mb-1'>
				<b> Times </b>
			</div>
			{mapTimes()}
		</Stack>
	);
};