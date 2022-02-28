import axios from 'axios';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { QuestEdit, QuestEditFormValues } from '../../components/quest-edit';
import { ExtendedSession } from '../../helper/validate-session';
import { Layout } from '../../layout/layout';
import { AddQuestRequest } from '../api/quests/add';

const Page : NextPage = () => {
	const data = useSession().data as ExtendedSession;

	const handleOnSubmit = async (formValues: QuestEditFormValues) => {
		const request : AddQuestRequest = {
			...formValues,
			creatorId: data.id
		};
		
		axios.post('/api/quests/add', request);
	};

	return(
		<Layout>
			<QuestEdit onSubmit={handleOnSubmit}/>
		</Layout>
	);
};

export default Page;