import { Card, Divider, List, ListItemButton } from '@mui/material';
import { ReactElement } from 'react';

interface MyListProps {
    items?: any[]
    renderCallback: (item: any) => JSX.Element
}

export const MyList = ({items, renderCallback} : MyListProps): ReactElement => {
	const mapItems = () => {
		return items?.map((item, index) => {
			return (
				<>
					{renderCallback(item)}
					{index < ( items.length - 1 ) && (
						<Divider component='li' />
					)}
				</>
			);
		});
	};
	return(
		<Card>
			<List disablePadding>
				{mapItems()}
			</List>	
		</Card>
	);
};