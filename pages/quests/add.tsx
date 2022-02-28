import axios from 'axios';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { QuestEdit, QuestEditFormValues } from '../../components/quest-edit';
import { ExtendedSession } from '../../helper/validate-session';
import { Layout } from '../../layout/layout';
import { AddQuestRequest } from '../api/quests/add';

const Page : NextPage = () => {
	const router = useRouter();
	const data = useSession().data as ExtendedSession;

	const handleOnSubmit = async (formValues: QuestEditFormValues) => {
		const request : AddQuestRequest = {
			...formValues,
			creatorId: data.id
		};
		
		await axios.post('/api/quests/add', request);
		router.back();
	};

	return(
		<Layout>
			<QuestEdit onSubmit={handleOnSubmit}/>
		</Layout>
	);
};

export default Page;