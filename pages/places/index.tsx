import { Star, StarOutline } from '@mui/icons-material';
import { Typography, Button, Stack, ListItem, IconButton, Chip } from '@mui/material';
import axios from 'axios';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { MyList } from '../../components/my-list';
import { ExtendedSession } from '../../helper/validate-session';
import { useUserConfig } from '../../hooks/user-config-provider';
import { Layout } from '../../layout/layout';
import { Place } from '../../modules/places/place-types';
import { AllPlacesRespone } from '../api/places/all';

const Index : NextPage = () => {
	const session = useSession().data as ExtendedSession;
	const [places, setPlaces] = useState<AllPlacesRespone[]>([]);
	const {userInfo, updateFavoritPlaces} = useUserConfig();


	useEffect(() => {
		(async () => {
			const response = await axios.get<AllPlacesRespone[]>('/api/places/all');
			setPlaces(response.data);
		})();
	},[]);
	
	if(!session) {
		return <></>;
	}

	const handleFavoritOnClick = async (place: Place) => {
		updateFavoritPlaces(place);
		await axios.post('/api/places/favorit', { placeId: place._id });
	};

	const handleRenderCallback = (place: AllPlacesRespone) : JSX.Element => {
		return (
			<ListItem 
				secondaryAction={
					<IconButton edge='end' aria-label='favorit' onClick={() => handleFavoritOnClick(place)}>
						{userInfo.favoritPlaces.findIndex(x => x.placeId === place._id.toString()) !== -1 ? <Star /> : <StarOutline /> }
					</IconButton>
				}
			>
				<Stack direction='row' alignItems='center' justifyContent='space-between' component='a' href={`/places/details/${place._id}`} sx={{width: '100%'}}>
					<div>{place.name}</div>
					{place.questCount > 0 &&  <Chip label={`Quests (${place.questCount})`} size='small'/>}					
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