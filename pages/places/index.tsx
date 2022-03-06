import { Delete, Star, StarOutline } from '@mui/icons-material';
import { Typography, Button, Stack, ListItemButton, ToggleButton, ListItem, IconButton, Chip } from '@mui/material';
import axios from 'axios';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { MyList } from '../../components/my-list';
import { ExtendedSession } from '../../helper/validate-session';
import { Layout } from '../../layout/layout';
import { Place } from '../../models/place-model';

const Index : NextPage = () => {
	const session = useSession().data as ExtendedSession;
	const [places, setPlaces] = useState<Place[]>([]);
	const [favoritPlaces, setFavoritPlaces] = useState<string[]>([]);

	useEffect(() => {
		(async () => {
			const favoritPlacesRequest = await axios.get<string[]>('/api/users/getFavoritPlaces');
			setFavoritPlaces(favoritPlacesRequest.data);

			const response = await axios.get<Place[]>('/api/places/all');
			setPlaces(response.data);
		})();
	},[]);
	
	if(!session) {
		return <></>;
	}

	const handleFavoritOnClick = async (placeId: string) => {
		await axios.post('/api/places/favorit', { placeId });
		
		
		const temp = [...favoritPlaces];
		const index = temp.indexOf(placeId);
		if(index !== -1) {
			temp.splice(index,1); 
		} else {
			temp.push(placeId);
		}
		setFavoritPlaces(temp);
	};

	const handleRenderCallback = (place: Place) : JSX.Element => {
		return (
			<ListItem 
				secondaryAction={
					<IconButton edge='end' aria-label='favorit' onClick={() => handleFavoritOnClick(place._id)}>
						{favoritPlaces.includes(place._id) ? <Star /> : <StarOutline /> }
					</IconButton>
				}
			>
				<Stack direction='row' alignItems='center' justifyContent='space-between' component='a' href={`/places/details/${place._id}`} sx={{width: '100%'}}>
					<div>{place.name}</div>
					<Chip label='Quests (2)' size='small'/>
				</Stack>

			</ListItem>
		);
	};

	return(
		<Layout>
			<Stack gap={1} sx={{marginTop: 2}}>
				<Typography gutterBottom variant='h6' component='div' sx={{paddingLeft: 2, paddingTop: 1}}>
	  				Places
				</Typography>
				<MyList items={places} renderCallback={handleRenderCallback}/>
				
				{
					session.isGamemaster && (
						<Button 
							component='a'
							href='/places/add'
							variant='contained'
						> Add Place </Button>		
					)
				}
				
				
			</Stack>			
		</Layout>
	);
};

export default Index;