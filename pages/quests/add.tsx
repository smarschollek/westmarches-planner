import axios from 'axios';
import { NextPage } from 'next';
import { QuestEdit, QuestEditFormValues } from '../../components/quest-edit';
import { Layout } from '../../layout/layout';

const Page : NextPage = () => {
	
	const handleOnSubmit = async (formValues: QuestEditFormValues) => {
		axios.post('/api/quests/add', {...formValues});
	};

	return(
		<Layout>
			<QuestEdit onSubmit={handleOnSubmit}/>
		</Layout>
	);
};

export default Page;