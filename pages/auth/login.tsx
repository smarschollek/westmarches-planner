import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import { userService } from '../../services/user-service';

const Login : NextPage = () => {
	const router = useRouter();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	
	const handleLogin = async (event : React.FormEvent) => {
		try {
			event.preventDefault();
			// await userService.login(username, password);
			const returnUrl = !!router.query.returnUrl ? router.query.returnUrl as string : '/';
			router.push(returnUrl);
		} catch {
			// showAlert('Login failed', 'danger');
		}
	};

	return(
		<Container className='w-100 h-100 d-grid align-content-center'>
			<Row className='h-100 align-items-center'>
				<Col xs={12} sm={{span: 8, offset: 2}} md={{span: 6, offset: 3}} lg={{span: 4, offset: 4}}>
					<Card className='p-3'>
						<Image src='/images/logo.png' rounded className='mb-3' alt='logo'/>
						<Form onSubmit={e => handleLogin(e)}>
							<Form.Group className='mb-3'>
								<Form.Control type='text' placeholder='Username' value={username} onChange={e => setUsername(e.currentTarget.value) }/>
							</Form.Group>

							<Form.Group className='mb-3'>
								<Form.Control type='password' placeholder='Password' value={password} onChange={e => setPassword(e.currentTarget.value) }/>
							</Form.Group>

							<Form.Group className='mb-3 d-grid'>
								<Button type='submit'>Login</Button>
							</Form.Group>
							<div className='text-center'>
                                or <br/>
								<a href='/register'>Register</a>
							</div>
						</Form>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default Login;