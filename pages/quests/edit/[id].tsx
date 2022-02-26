import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { QuestEdit, QuestEditFormValues } from '../../../components/quest-edit';
import { Layout } from '../../../layout/layout';
import { Quest } from '../../../types/Place';

const Page : NextPage = () => {
	const router  = useRouter();
	const [quest, setQuest] = useState<Quest>();

	useEffect(() => {
		(async() => {
			try {
				if(router.query.id) {
					const response = await axios.get<Quest>(`/api/quests/get?id=${router.query.id}`);
					setQuest(response.data);
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
			<QuestEdit onSubmit={handleOnSubmit} defaultValues={quest}/>
		</Layout>
		
	);
};

export default Page;