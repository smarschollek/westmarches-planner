import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { Layout } from '../../layout/layout';
import { Quest } from '../../types/Place';

const Page : NextPage = () => {
	const router = useRouter();
	const [quests, setQuests] = useState<Quest[]>([]);

	useEffect(()=> {
		(async () => {
			const response = await axios.get<Quest[]>('/api/quests/all');
			setQuests(response.data);
		})();
	}, []);

	const mapQuests = () => {
		return quests.map((quest, index) => {
			return <ListGroupItem action href={`/quests/details/${quest._id}`} key={index}>{quest.name}</ListGroupItem>;
		});
	};

	return(
		<Layout>
			<Row>
				<Col lg={{span: 6, offset: 3}} md={{span: 8, offset: 2}} >
					<h5 className='mb-4'>Quests</h5>
					
					<ListGroup>
						{mapQuests()}
					</ListGroup>

					<div className='d-grid mt-2'>
						<Button onClick={() => router.push('/quests/add')}>Add Quest</Button>
					</div>	
				</Col>
			</Row>
			
		</Layout>
	);
};

export default Page;