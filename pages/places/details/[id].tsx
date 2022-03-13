import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Layout } from '../../../layout/layout';
import { GetPlaceResponse } from '../../api/places/get';
import { Button, Card, CardActions, CardContent, CardMedia, Divider, ListItemButton, Stack, Typography } from '@mui/material';
import { MyList } from '../../../components/my-list';
import { useSession } from 'next-auth/react';
import { ExtendedSession } from '../../../helper/validate-session';
import { Quest } from '../../../modules/quests/quest-types';

const Details : NextPage = () => {
	const router  = useRouter();
	const session = useSession().data as ExtendedSession;
	const [place, setPlace] = useState<GetPlaceResponse>();
	
	useEffect(() => {
		(async () => {
			if(router.query.id) {
				const response = await fetch(`/api/places/get?id=${router.query.id}&includeQuests=true`);
				const data = await response.json();
				setPlace(data);
			}
		})();
	},[router.query.id]);

	if(!place) {
		return <></>;
	}

	const handleRenderCallback = (quest: Quest) => {
		return (
			<ListItemButton component='a' href={`/quests/details/${quest._id}`}>
				{quest.name}
			</ListItemButton>
		);
	};

	return(
		<Layout>
			<Stack sx={{marginTop: 2}}>
				<Card>
					{
						place.imageGuid && (
							<CardMedia
								component='img'
								image={`/api/images/${place.imageGuid}`}
								sx={{maxHeight: 400, objectFit: 'contain'}}
							/>
						)
					}
					
					<CardContent>
						<Stack gap={2}>
							<Typography variant='h5' color='text.secondary'>
								{place.name}
							</Typography>
							<Typography variant='body1' color='text.secondary'>
								{place.description}
							</Typography>
							<Divider/>
							<Typography variant='h6' color='text.secondary'>
								Quests
							</Typography>
							<MyList items={place.quests} renderCallback={handleRenderCallback}/>
						</Stack>
					</CardContent>
					<CardActions>
						<Stack direction='row' gap={1}>
							{ session.isGamemaster && <Button variant='contained' href={`/places/edit/${place._id}`}>Edit</Button>}
						</Stack>
					</CardActions>
				</Card>
			</Stack>
		</Layout>
	);
};

export default Details;