import { AccessTime, Map, QuestionMark } from '@mui/icons-material';
import { ListItemButton, Stack, Typography } from '@mui/material';
import type { NextPage } from 'next';
import { MyList } from '../components/my-list';
import { useUserConfig } from '../hooks/user-config-provider';
import { Layout } from '../layout/layout';
import { FavoritPlace, SubscribedQuest } from '../modules/users/user-types';

const Home: NextPage = () => {
	const {userInfo} = useUserConfig();

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
			</Stack>
		</Layout>
	);
};

export default Home;
