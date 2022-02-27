import axios from 'axios';
import type { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Badge, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { Layout } from '../layout/layout';
import { Place, Quest } from '../types/dtos';

const Home: NextPage = () => {
	const [quests, setQuests] = useState<Quest[]>([]);
	const [places, setPlaces] = useState<Place[]>([]);

	useEffect(() => {
		(async () => {
			try {
				const responseQuests = await axios.get<Quest[]>('/api/quests/open');
				setQuests(responseQuests.data);

				const responsePlaces = await axios.get<Place[]>('/api/places/all');
				setPlaces(responsePlaces.data);
			} catch (error) {
				
			}
		})();
	}, []);

	return (
		<Layout>
			<Row>
				<Col lg={{span: 6, offset: 3}} md={{span: 8, offset: 2}} >
					<h4>Quests</h4>						
					<ListGroup className='mb-4'>
						{quests.map((quest, index) => (
							<ListGroupItem 
								action	
								href={`/quests/details/${quest._id}`}
								key={index}
							>
								<span>{quest.name}</span>
							</ListGroupItem>
						))}
					</ListGroup>
					<h4>Places</h4>						
					<ListGroup className='mb-4'>
						{places.map((place, index) => (
							<ListGroupItem 
								action
								className='d-flex justify-content-between'
								href={`/places/details/${place._id}`}
								key={index}
							>
								<span className='text-truncate'>{place.name}</span>
								<Badge>{place.questCount} Quest(s)</Badge>
							</ListGroupItem>
						))}
					</ListGroup>
					<h4>Sessions</h4>	
				</Col>
			</Row>					
		</Layout>
	);
};

export default Home;
