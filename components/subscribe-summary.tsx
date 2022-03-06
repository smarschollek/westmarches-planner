import { Stack, Typography } from '@mui/material';
import { ReactElement } from 'react';
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
				<Stack key={key} direction='row' justifyContent='space-between'>
					<div className='fw-light'>{key}</div>
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