import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Badge, Button, ButtonGroup, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { Layout } from '../../layout/layout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Quest } from '../../models/quest-model';
import {faPlus, faAngleLeft} from '@fortawesome/free-solid-svg-icons';
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
			return <ListGroupItem 
				action
			 	href={`/quests/details/${quest._id}`} 
			 	key={index}
				 className='d-flex justify-content-between align-items-center'
			>
				<div>
					<div className='fs-6'>{quest.name}</div>
					<div className='fw-bold' style={{fontSize: '0.9rem'}}>{quest.creator}</div>
				</div>
				{ quest.subscriber.length > 0 && <Badge> {`${quest.subscriber.length} subscriber`} </Badge>}
			</ListGroupItem>;
		});
	};

	return(
		<Layout>
			<Row>
				<Col lg={{span: 6, offset: 3}} md={{span: 8, offset: 2}} >
					<h4>Quests</h4>
					<hr className='my-4'></hr>
					<ListGroup>
						{mapQuests()}
					</ListGroup>
					<hr className='my-4'></hr>
					<div className='d-grid mt-2'>
						<ButtonGroup>
							<Button variant='success' onClick={() => router.back()}>
								<FontAwesomeIcon icon={faAngleLeft} className='me-2'/>
								Back
							</Button>
							<Button onClick={() => router.push('/quests/add')}>
								<FontAwesomeIcon icon={faPlus} className='me-2'/>
								Add Quest
							</Button>
						</ButtonGroup>
					</div>	
				</Col>
			</Row>
			
		</Layout>
	);
};

export default Page;