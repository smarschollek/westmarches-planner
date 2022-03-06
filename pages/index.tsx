import { Card, CardContent, CardHeader, Stack } from '@mui/material';
import axios from 'axios';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useUserConfig } from '../hooks/user-config-provider';
import { Layout } from '../layout/layout';
import { Place } from '../models/place-model';
import { Quest } from '../models/quest-model';


const Home: NextPage = () => {
	const [quests, setQuests] = useState<Quest[]>([]);
	const [places, setPlaces] = useState<Place[]>([]);
	const {userInfo} = useUserConfig();

	useEffect(() => {
		(async () => {
			try {
				// const responseQuests = await axios.get<Quest[]>('/api/quests/open');
				// setQuests(responseQuests.data);

				// const responsePlaces = await axios.get<Place[]>('/api/places/all');
				// setPlaces(responsePlaces.data);
			} catch (error) {
				
			}
		})();
	}, []);

	return (
		<Layout>
			<Stack gap={2} sx={{marginTop: 2}}>
				<Card>
					<CardHeader
						title='Quests'
					/>
					<CardContent>
						{userInfo.subscribedQuests.map(place => (<div key={place}>{place}</div>))}
					</CardContent>
				</Card>
				<Card>
					<CardHeader
						title='Places'
					/>
					<CardContent>
						{userInfo.favoritPlaces.map(place => (<div key={place}>{place}</div>))}
					</CardContent>
				</Card>
				<Card>
					<CardHeader
						title='Sessions'
					/>
					<CardContent>
					asdad
					</CardContent>
				</Card>
			</Stack>
		</Layout>
	);
};

export default Home;
