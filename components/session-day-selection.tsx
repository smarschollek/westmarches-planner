import { ListItemButton, Stack } from '@mui/material';
import { ReactElement } from 'react';
import { MyList } from './my-list';

interface SessionDaySelectionProps {
    days: string[]
    onDaySelection: (day: string) => void
}

export const SessionDaySelection = ({days, onDaySelection} : SessionDaySelectionProps): ReactElement => {
	
	const handleRenderCallback = (value: string) => {
		return (
			<ListItemButton>
				{value}
			</ListItemButton>
		);
	};
    
	return(
		<Stack>
			<MyList items={days} renderCallback={handleRenderCallback}/>
		</Stack>
	);
};