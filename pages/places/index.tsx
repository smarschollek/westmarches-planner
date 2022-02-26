import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import { PlaceEdit } from '../../components/place-edit';
import { Place } from '../../types/Place';

const Index : NextPage = () => {
	const [places, setPlaces] = useState<Place[]>([]);
	
	useEffect(() => {
		(async () => {
			const response = await fetch('/api/places/getAll');
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
		<ListGroup>
			{mapPlaces()}
		</ListGroup>
	);
};

export default Index;