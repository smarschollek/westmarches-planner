import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { QuestEdit, QuestEditFormValues } from '../../components/quest-edit';
import { Layout } from '../../layout/layout';
import { Place } from '../../modules/places/place-types';
import { AddQuestRequest } from '../api/quests/add';

const Page : NextPage = () => {
	const router = useRouter();
	const [places, setPlaces] = useState<Place[]>();

	useEffect(() => {
		(async () => {
			const response = await axios.get<Place[]>('/api/places/all');
			setPlaces(response.data);

		})();
	}, []);

	if(!places) {
		return <></>;
	}

	const handleOnSubmit = async (formValues: QuestEditFormValues) => {
		const request : AddQuestRequest = {
			...formValues
		};
		
		await axios.post('/api/quests/add', request);
		router.back();
	};

	const defaultValues : QuestEditFormValues = {
		name: '',
		description: '',
		placeId: places[0] ? places[0]._id.toString() : '',
		questState: 'Open',
		imageGuid: ''
	};

	return(
		<Layout>
			<QuestEdit onSubmit={handleOnSubmit} defaultValues={defaultValues} places={places}/>
		</Layout>
	);
};

export default Page;