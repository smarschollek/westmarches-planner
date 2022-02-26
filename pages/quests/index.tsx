import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { Layout } from '../../layout/layout';

const Page : NextPage = () => {
	const router = useRouter();
    
	return(
		<Layout>
			{/* <QuestList quests={quests}/> */}
			<div className='d-grid mt-2'>
				<Button onClick={() => router.push('/quests/add')}>Add Quest</Button>
			</div>
		</Layout>
	);
};

export default Page;