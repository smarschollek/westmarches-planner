import { Typography, Button, Stack, ListItemButton } from '@mui/material';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { MyList } from '../../components/my-list';
import { Layout } from '../../layout/layout';
import { Place } from '../../models/place-model';

const Index : NextPage = () => {
	const router = useRouter();
	
	const [places, setPlaces] = useState<Place[]>([]);
	
	useEffect(() => {
		(async () => {
			const response = await fetch('/api/places/all');
			const data = await response.json();
			setPlaces(data);
		})();
	},[]);
	
	const handleRenderCallback = (place: Place) : JSX.Element => {
		return (
			<ListItemButton component='a' href={`/places/details/${place._id}`}>
				{place.name}
			</ListItemButton>
		);
	};

	return(
		<Layout>
			<Stack gap={1} sx={{marginTop: 2}}>
				<Typography gutterBottom variant='h6' component='div' sx={{paddingLeft: 2, paddingTop: 1}}>
	  				Places
				</Typography>
				<MyList items={places} renderCallback={handleRenderCallback}/>
				<Button 
					component='a'
					href='/places/add'
					variant='contained'
				> Add Place </Button>		
			</Stack>			
		</Layout>
	);
};

export default Index;