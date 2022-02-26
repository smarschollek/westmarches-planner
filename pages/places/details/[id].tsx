import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ListGroup, Button, ListGroupItem, Image } from 'react-bootstrap';
import { Place, PlaceWithQuests, Quest } from '../../../types/Place';

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
		<>
			<h4>{place.name}</h4>
			<div className='d-flex justify-content-center'>
				<Image src={`/uploads/${place.imageGuid}`} rounded alt='place' style={{maxHeight: '400px'}}/>
			</div>
			
			<h6 className='mt-4'>Description</h6>
			<div>{place.description}</div>

			<h6 className='mt-4 mb-3'>Quests</h6>
			<div>
				<ListGroup>
					{mapQuests(place.quests ?? [])}
				</ListGroup>
			</div>
			<div className='d-grid mt-4'>
				<Button href={`/places/edit/${place._id}`}> Edit </Button>
			</div>
		</>
	);
};

export default Details;