import { AccessTime, Map, QuestionMark } from '@mui/icons-material';
import { ListItemButton, Stack, Typography } from '@mui/material';
import axios from 'axios';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { MyList } from '../components/my-list';
import { useUserConfig } from '../hooks/user-config-provider';
import { Layout } from '../layout/layout';
import { FavoritPlace, SubscribedQuest } from '../modules/users/user-types';
import { MySessionsResponse, SessionInfo } from './api/sessions/mysessions';

const Home: NextPage = () => {
	const {userInfo} = useUserConfig();
	const [sessions, setSessions] = useState<SessionInfo[]>([]);

	useEffect(() => {
		(async () => {
			const response = await axios.get<MySessionsResponse>('/api/sessions/mysessions');
			setSessions(response.data.sessions);
		})();
	}, []);

	const favoritPlacesRenderCallback = (place: FavoritPlace) => {
		return (
			<ListItemButton component='a' href={`/places/details/${place.placeId}`}>
				{place.name}
			</ListItemButton>
		);
	};

	const subscribedQuestsRenderCallback = (quest: SubscribedQuest) => {
		return (
			<ListItemButton component='a' href={`/quests/details/${quest.questId}`}>
				{quest.name}
			</ListItemButton>
		);
	};

	const sessionsRenderCallback = (session: SessionInfo) => {
		return (
			<ListItemButton component='a' href={`/session/details/${session.questId}`}>
				<Stack direction='row' justifyContent='space-between' sx={{width: '100%'}}>
					{session.questName}
					<div> {`${session.date.day} ${session.date.hours[0]}:00 - ${session.date.hours[session.date.hours.length-1]}:00`} </div>
				</Stack>
			</ListItemButton>
		);
	};

	return (
		<Layout>
			<Stack gap={2} sx={{marginTop: 2}}>
				<Stack direction='row' alignItems='center' gap={1}>
					<QuestionMark/>
					<Typography variant='h6'>
						Quests
					</Typography>
				</Stack>
				<MyList items={userInfo.subscribedQuests} renderCallback={subscribedQuestsRenderCallback}/>

				<Stack direction='row' alignItems='center' gap={1}>
					<Map/>
					<Typography variant='h6'>
						Fav. Places
					</Typography>
				</Stack>
				<MyList items={userInfo.favoritPlaces} renderCallback={favoritPlacesRenderCallback}/>
				
				<Stack direction='row' alignItems='center' gap={1}>
					<AccessTime/>
					<Typography variant='h6'>
						Sessions
					</Typography>
				</Stack>
				<MyList items={sessions} renderCallback={sessionsRenderCallback}/>
			</Stack>
		</Layout>
	);
};

export default Home;
