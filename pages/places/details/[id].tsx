import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ListGroup, Button, ListGroupItem, Image, Col, Row, ButtonGroup } from 'react-bootstrap';
import { Layout } from '../../../layout/layout';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faAngleLeft, faPen } from '@fortawesome/free-solid-svg-icons';
import { Quest } from '../../../models/quest-model';
import { GetPlaceResponse } from '../../api/places/get';

const Details : NextPage = () => {
	const router  = useRouter();
	const [place, setPlace] = useState<GetPlaceResponse>();
	
	useEffect(() => {
		(async () => {
			if(router.query.id) {
				const response = await fetch(`/api/places/get?id=${router.query.id}&includeQuests=true`);
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
									<Image fluid src={`/api/images/${place.imageGuid}`} rounded alt='place' style={{maxHeight: '400px'}}/>
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
						<ButtonGroup>
							<Button variant='success' onClick={() => router.back()}>
								<FontAwesomeIcon icon={faAngleLeft} className='me-2'/>
								Back
							</Button>
							<Button href={`/places/edit/${place._id}`}> 
								<FontAwesomeIcon icon={faPen} className='me-2'/>
								Edit
							</Button>
						</ButtonGroup>
						
					</div>
				</Col>
			</Row>
			
		</Layout>
	);
};

export default Details;