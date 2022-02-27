import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import { Layout } from '../../layout/layout';
import { Place } from '../../types/dtos';

const Index : NextPage = () => {
	const router = useRouter();
	
	const [places, setPlaces] = useState<Place[]>([]);
	
	useEffect(() => {
		(async () => {
			const response = await fetch('/api/places/all');
			const data = await response.json();
			setPlaces(data);
		})();
	},[]);
	
	const mapPlaces = () => {
		return places.map((place, index) => (
			<ListGroupItem action href={`/places/details/${place._id}`} key={index}>{place.name}</ListGroupItem>
		));
	};

	return(
		<Layout>
			<Row>
				<Col lg={{span: 6, offset: 3}} md={{span: 8, offset: 2}} >
					<h5>Places</h5>
					<hr className='my-4'></hr>
					<ListGroup>
						{mapPlaces()}
					</ListGroup>
					<hr className='my-4'></hr>
					<div className='d-grid'>
						<Button onClick={() => router.push('/places/add')}>Add Place</Button>
					</div>	
				</Col>
			</Row>	
		</Layout>
	);
};

export default Index;