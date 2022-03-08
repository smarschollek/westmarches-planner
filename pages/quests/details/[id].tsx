import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Layout } from '../../../layout/layout';
import { Quest, Subscriber } from '../../../models/quest-model';
import { ExtendedSession } from '../../../helper/validate-session';
import { useSession } from 'next-auth/react';
import { CardMedia, CardContent, Typography, Stack, Card, CardActions, Button, ListItemButton, Chip, ListItemText, Divider } from '@mui/material';
import { MyList } from '../../../components/my-list';

const Page : NextPage = () => {
	const router = useRouter();
	const [quest,setQuest] = useState<Quest>();
	const data = useSession().data as ExtendedSession;

	useEffect(() => {
		(async() => {
			if(router.query.id) {
				const response = await axios.get<Quest>(`/api/quests/get?id=${router.query.id}`);
				setQuest(response.data);
			}
		})();
	}, [router.query.id]);

	if(!quest) {
		return <></>;
	}

	const renderSubscribeOrUnsubscribeButton = () => {				
		if(data.user?.name === quest.creator) {
			return (
				<>
					<Button variant='contained' href={`/quests/edit/${quest._id}`}>
						Edit
					</Button>
					<Button disabled variant='contained' color='error' href={`/quests/delete/${quest._id}`}>
						Delete
					</Button>
				</>
				
			);
		}
		
		if(quest.subscriber.findIndex(x=>x.name === data.user?.name) !== -1) {
			return (
				<Button variant='contained' href={`/quests/unsubscribe/${quest._id}`}>
					Unsubscribe
				</Button>
			);	
		}

		return (
			<Button variant='contained' href={`/quests/subscribe/${quest._id}`}>
				Subscribe
			</Button>
		);
	};

	const handleRenderCallback = (subscriber: Subscriber) => {
		return (
			<ListItemButton>
				<ListItemText 
					primary={subscriber.characterName}
					secondary={subscriber.name}
				/>
				<Chip size='small' label={`${subscriber.characterClass} (${subscriber.characterLevel})`}></Chip>
			</ListItemButton>
		);
	};

	return(
		<Layout>
			<Stack sx={{marginTop: 2}}>
				<Card>
					{
						quest.imageGuid && (
							<CardMedia
								component='img'
								image={`/api/images/${quest.imageGuid}`}
								sx={{maxHeight: 400, objectFit: 'contain'}}
							/>
						)
					}
					<CardContent>
						<Stack gap={2}>
							<Typography variant='h6' color='text.secondary'>
								{quest.name}
							</Typography>
							<Typography variant='body2' color='text.secondary'>
								{quest.description}
							</Typography>
							<Divider/>
							<Typography variant='h6' color='text.secondary'>
								Subscriber
							</Typography>
							<MyList items={quest.subscriber} renderCallback={handleRenderCallback}/>
						</Stack>
					</CardContent>
					<CardActions>
						<Stack direction='row' gap={1}>
							{renderSubscribeOrUnsubscribeButton()}
						</Stack>
					</CardActions>
				</Card>
			</Stack>
		</Layout>
	);
};

export default Page;