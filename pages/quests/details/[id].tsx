import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Layout } from '../../../layout/layout';
import { ExtendedSession } from '../../../helper/validate-session';
import { useSession } from 'next-auth/react';
import { CardMedia, CardContent, Typography, Stack, Card, CardActions, Button, ListItemButton, Chip, ListItemText, Divider, Modal, Box, CardHeader } from '@mui/material';
import { MyList } from '../../../components/my-list';
import { Quest, Subscriber } from '../../../modules/quests/quest-types';
import { MyModal } from '../../../modules/common/components/MyModal';

const Page : NextPage = () => {
	const router = useRouter();
	const [quest,setQuest] = useState<Quest>();
	const data = useSession().data as ExtendedSession;
	const [modal, setModal] = useState<{title: string, content: JSX.Element, callback: () => void} | null>(null);

	useEffect(() => {
		if(modal === null) {
			(async() => {
				if(router.query.id) {
					const response = await axios.get<Quest>(`/api/quests/get?id=${router.query.id}`);
					setQuest(response.data);
				}
			})();
		}
	}, [router.query.id, modal]);

	if(!quest) {
		return <></>;
	}

	const handleUnsubscribe = async () => {
		const char = quest.subscriber.find(x => x.username === data.user?.name);
		if(char) {
			await axios.post('/api/quests/unsubscribe', {
				questId: quest._id,
				subscriberId: char._id
			});
			setModal(null);
		}
	};

	const renderSubscribeOrUnsubscribeButton = () => {						
		if(data.user?.name === quest.creator) {
			return (
				<>
					<Button variant='contained' href={`/quests/edit/${quest._id}`}>
						Edit
					</Button>
					{
						quest.subscriber && quest.subscriber.length > 0 && (
							<Button variant='contained' href={`/quests/create-session/${quest._id}`}>
								Create Session
							</Button>
						)
					}

					<Button variant='contained' color='error' onClick={() => setModal({
						title: 'Delte Quests',
						content: <>Are you sure you want to delete <b>{quest.name}</b> ?</>,
						callback: () => handleDeleteQuest()
					})}>
						Delete
					</Button>
				</>
				
			);
		}
		
		if(quest.subscriber.findIndex(x => x.username === data.user?.name) !== -1) {
			return (
				<Button variant='contained' onClick={() => setModal({
					title: 'Unsubscribe from Quest',
					content: <>Are you sure you want to unsubscribe from <b>{quest.name}</b> ? </>,
					callback: handleUnsubscribe
				})}>
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
					primary={subscriber.character.name}
					secondary={`Player ( ${subscriber.username} )`}
				/>
				<Chip size='small' label={`${subscriber.character.class} (${subscriber.character.level})`}></Chip>
			</ListItemButton>
		);
	};

	const handleDeleteQuest = async () => {
		await axios.get(`/api/quests/delete?id=${quest._id}`);
		router.replace('/quests');
	};

	const renderModal = () : JSX.Element => {
		if(modal) {
			return (
				<Card sx={{width: 400}}>
					<CardHeader title={modal.title}/>
					<CardContent>
						{modal.content}
					</CardContent>
					<CardActions>
						<Button fullWidth variant='contained' onClick={() => modal.callback()}> Yes </Button>
						<Button fullWidth color='secondary' variant='contained' onClick={() => setModal(null)}> No </Button>
					</CardActions>
				</Card>
			);
		}

		return <></>;
	};

	return(
		<Layout>
			<MyModal open={modal !== null} content={renderModal()}/>
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