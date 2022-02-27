import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

export type RegisterFormValues = {
    name: string,
    email: string,
    password: string
}

const Register : NextPage = () => {
	const router = useRouter();

	const onSubmit = async (formValues: RegisterFormValues) => {
		
		router.push('/login');
	};

	const {register, handleSubmit, formState} = useForm<RegisterFormValues>({
		mode: 'onChange'
	});

	return(
		<Container className='w-100 h-100'>
			<Row className='h-100 align-items-center'>
				<Col xs={12} sm={{span: 8, offset: 2}} md={{span: 6, offset: 3}} lg={{span: 4, offset: 4}}>
					<Card className='p-3'>
						<h5 className='mb-4 text-center'>Register new User</h5>
						<Form onSubmit={handleSubmit(onSubmit)}>
							<Form.Group className='mb-3'>
								<Form.Control 
									type='text' 
									placeholder='Name' 
									autoComplete='off'
									{...register('name', {required: true})}
								/>
							</Form.Group>

							<Form.Group className='mb-3'>
								<Form.Control 
									type='email' 
									placeholder='Email' 
									{...register('email', {required: true})}
								/>
							</Form.Group>

							<Form.Group className='mb-3'>
								<Form.Control 
									type='password' 
									placeholder='Password' 
									{...register('password', {required: true})}
								/>
							</Form.Group>

							<Form.Group className='d-grid'>
								<Button 
									disabled={!formState.isValid}
									className='mb-2' 
									type='submit'
								>
									Register
								</Button>
								<Button variant='secondary' onClick={() => router.back()}>Back</Button>
							</Form.Group>
						</Form>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};
export default Register;