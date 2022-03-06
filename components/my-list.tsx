import { Card, Divider, List, ListItemButton } from '@mui/material';
import { ReactElement } from 'react';

interface MyListProps {
    items?: any[]
    renderCallback: (item: any, index: number) => JSX.Element
}

export const MyList = ({items, renderCallback} : MyListProps): ReactElement => {
	const mapItems = () => {
		return items?.map((item, index) => {
			return (
				<div key={index}>
					{renderCallback(item)}
					{index < ( items.length - 1 ) && (
						<Divider component='li' />
					)}
				</div>
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