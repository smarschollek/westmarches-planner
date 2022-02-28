import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Row, Col, Badge, Button, Stack, ButtonGroup, ListGroup, ListGroupItem } from 'react-bootstrap';
import { ExtendedSession } from '../helper/validate-session';
import { Character } from '../models/user-model';

const UserDetails = () => {
	const data = useSession().data as ExtendedSession;
	const router = useRouter();
	const [characters, setCharacters] = useState<Character[]>([]);
	useEffect(() => {
		(async () => {
			const response = await axios.get('/api/users/getCharacters');
			setCharacters(response.data);
		})();
	}, []);

	const mapCharacters = () => {
		return characters.map((character, index) => {
			return (
				<ListGroupItem 
					action
					href={`/character/details/${character._id}`}
					key={index} 
					className='d-flex justify-content-between'>
					<span>{character.name}</span>
					<Badge>{`${character.class} (${character.level})`}</Badge>
				</ListGroupItem>
			);
		});
	};

	if(!data || !data.user) {
		return <></>;
	}

	return(
		<Row>
			<Col lg={{span: 6, offset: 3}} md={{span: 8, offset: 2}} >
				<Stack gap={2}>
					{/* <hr className='my-4'></hr>
					<div className='d-flex justify-content-center align-content-center'>
						<Circle className='shadow-lg'>
							{user.name[0].toUpperCase()}
						</Circle>
					</div> */}
					<hr className='my-4'></hr>
					<div className='mb-4 mt-4 d-flex justify-content-between'>
						<div>Name:</div>
						<div>{data.user.name}</div>
					</div>

					<div className='mb-4 d-flex justify-content-between'>
						<div>Roles:</div>
						<div>
							<Badge bg='info' className='mx-1'>User</Badge>
							{data.isAdmin && <Badge bg='secondary' className='mx-1'>Admin</Badge>}
							{data.isGamemaster && <Badge bg='success' className='mx-1'>Gamemaster</Badge>}
						</div>
					</div>

					<div className='mb-4 d-flex justify-content-between'>
						<div>Email:</div>
						<div>{data.user.email}</div>
					</div>
					<hr className='my-4'></hr>
					
					<ListGroup>
						{mapCharacters()}
					</ListGroup>

					<hr className='my-4'></hr>

					<ButtonGroup>
						<Button disabled onClick={() => router.push(`/changepassword/${data.id}`)}> Change Password </Button>
						<Button variant='secondary' onClick={() => router.push('/character/add')}> Add Character </Button>
						{data.isAdmin && <Button onClick={() => router.push(`/changeroles/${data.id}`)}> Change Roles </Button>}
					</ButtonGroup>
					
				</Stack>
			</Col>
		</Row>
	);
};

export default UserDetails;