import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { QuestEdit, QuestEditFormValues } from '../../../components/quest-edit';
import { Layout } from '../../../layout/layout';
import { Place } from '../../../modules/places/place-types';
import { Quest } from '../../../modules/quests/quest-types';

const Page : NextPage = () => {
	const router  = useRouter();
	const [quest, setQuest] = useState<Quest>();
	const [places, setPlaces] = useState<Place[]>([]);
	const [fetched, setFetched] = useState(false);
	
	useEffect(() => {
		(async() => {
			try {
				if(router.query.id) {
					const placesResponse = await axios.get<Place[]>('/api/places/all');
					setPlaces(placesResponse.data);
					
					const questResponse = await axios.get<Quest>(`/api/quests/get?id=${router.query.id}`);
					setQuest(questResponse.data);
					setFetched(true);
				}
			} catch (error) {
				router.back();
			}
		})();
	}, [router, router.query.id]);

	const handleOnSubmit = async (formValues: QuestEditFormValues) => {
		await axios.post('/api/quests/update', {...formValues});
		router.back();
	};

	if(!quest) {
		return <></>;
	}

	return(
		<Layout>
			<QuestEdit onSubmit={handleOnSubmit} defaultValues={quest} places={places}/>
		</Layout>
		
	);
};

export default Page;