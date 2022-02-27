import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Row, Col, Badge, Button, Stack } from 'react-bootstrap';
import { ExtendedSession } from '../pages/api/auth/[...nextauth]';

const UserDetails = () => {
	const data = useSession().data as ExtendedSession;
	const router = useRouter();
    
	if(!data || !data.user) {
		return <></>;
	}

	return(
		<Row>
			<Col lg={{span: 6, offset: 3}} md={{span: 8, offset: 2}} >
				<Stack gap={2}>
					<div className='d-flex justify-content-center align-content-center'>
						{/* <Circle className='shadow-lg'>
							{user.name[0].toUpperCase()}
						</Circle> */}
					</div>
				
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

					<Button onClick={() => router.push(`/changepassword/${data.id}`)}> Change Password </Button>
					{data.isAdmin && <Button onClick={() => router.push(`/changeroles/${data.id}`)}> Change Roles </Button>}
				</Stack>
			</Col>
		</Row>
	);
};

export default UserDetails;