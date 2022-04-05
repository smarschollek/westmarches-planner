import { Box, Stack, Typography } from '@mui/material';
import { ReactElement } from 'react';
import { WeekDay } from '../../../helper/dayjs-helper';

interface DaySelectionItemProps {
    value: WeekDay
    selected?: boolean
    highlight?: boolean
    onClick: (value : WeekDay) => void
}

export const DaySelectionItem = ({value, selected, highlight, onClick} : DaySelectionItemProps): ReactElement => {
	return(
		<Stack
			gap={0.3} 
			onClick={() => {
				onClick(value);
			}}
			alignItems='center'
			sx={{
				minWidth: 50,
				height: 80,
				cursor: 'pointer'
			}}>
			<Typography variant='overline'>
				{value.name}
			</Typography>
			<Typography variant='subtitle1' sx={ selected ? {
				borderRadius: 50,
				textAlign: 'center',
				width: 30,
				background: '#0b5ed7'
			} : {}}>
				{value.num}
			</Typography>
			<Box sx={ highlight ? 
				{
					background: '#0b5ed7',
				    width: 5,
				    height: 5,
					borderRadius: 50
				} :
				{
					width: 5,
					height: 5
				}}></Box>
		</Stack>
	);
};