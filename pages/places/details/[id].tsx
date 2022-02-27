import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ListGroup, Button, ListGroupItem, Image, Col, Row } from 'react-bootstrap';
import { Layout } from '../../../layout/layout';
import { Place, PlaceWithQuests, Quest } from '../../../types/dtos';

const Details : NextPage = () => {
	const router  = useRouter();
	const [place, setPlace] = useState<PlaceWithQuests>();

	useEffect(() => {
		(async () => {
			if(router.query.id) {
				const response = await fetch(`/api/places/get?id=${router.query.id}`);
				const data = await response.json();
				setPlace(data);
			}
		})();
	},[router.query.id]);

	const mapQuests = (quests: Quest[]) => {
		return quests.map((quest, index) => {
			return (
				<ListGroupItem key={index}>{quest.name}</ListGroupItem>
			);
		});
	};

	if(!place) {
		return <></>;
	}

	return(
		<Layout>
			<Row>
				<Col lg={{span: 6, offset: 3}} md={{span: 8, offset: 2}} >
					<h4>{place.name}</h4>
					<hr className='my-4'></hr>
					{
						place.imageGuid && (
							<>
								<div className='d-flex justify-content-center'>
									<Image fluid src={`/uploads/${place.imageGuid}`} rounded alt='place' style={{maxHeight: '400px'}}/>
								</div>
								<hr className='my-4'></hr>
							</>
						)
					}
					<h6>Description</h6>
					<div>{place.description}</div>
					<hr className='my-4'></hr>
					{
						place.quests && (
							<>
								<h6>Quests</h6>
								<ListGroup>
									{mapQuests(place.quests ?? [])}
								</ListGroup>
								<hr className='my-4'></hr>
							</>
						)
					}
					<div className='d-grid'>
						<Button href={`/places/edit/${place._id}`}> Edit </Button>
						<Button className='mt-2' variant='success' onClick={() => router.back()}>Back</Button>
					</div>
				</Col>
			</Row>
			
		</Layout>
	);
};

export default Details;