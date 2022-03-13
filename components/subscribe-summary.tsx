import { Stack, Typography } from '@mui/material';
import { ReactElement } from 'react';
import { groupTimes } from '../helper/dayjs-helper';
import { DayAndTime } from '../modules/common/common-types';
import { Quest } from '../modules/quests/quest-types';
import { Character } from '../modules/users/user-types';

interface SubscribeSummaryProps {
	quest?: Quest
	character?: Character
	times: DayAndTime[]
}

export const SubscribeSummary = ({quest, character, times}: SubscribeSummaryProps): ReactElement => {
	const mapTimes = () => {
		return times.map(time => {
			const values = groupTimes(time.hours);
			return (
				<Stack key={time.day} direction='row' justifyContent='space-between'>
					<div className='fw-light'>{time.day}</div>
					<div>
						{values.map((v,i) => <div key={i}>{`${v[0]}:00 - ${v[1]}:00`}</div>)}
					</div>
				</Stack>
			);
		});
	};
	
	return(
		<Stack>
			<Typography variant='h6' sx={{marginTop: 2, marginBottom: 2}}>
				Quest
			</Typography>

			<Stack direction='row' justifyContent='space-between'>
				<div className='fw-light'>Name</div>
				<div>{quest?.name}</div>
			</Stack>

			<Typography variant='h6' sx={{marginTop: 2, marginBottom: 2}}>
				Character
			</Typography>
			<Stack direction='row' justifyContent='space-between'>
				<div className='fw-light'>Name</div>
				<div>{character?.name}</div>
			</Stack>
			<Stack direction='row' justifyContent='space-between'>
				<div className='fw-light'>Class</div>
				<div>{character?.class}</div>
			</Stack>
			<Stack direction='row' justifyContent='space-between'>
				<div className='fw-light'>Level</div>
				<div>{character?.level}</div>
			</Stack>

			<Typography variant='h6' sx={{marginTop: 2, marginBottom: 2}}>
				Times
			</Typography>
			{mapTimes()}
		</Stack>
	);
};