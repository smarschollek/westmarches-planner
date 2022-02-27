import axios from 'axios';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Image } from 'react-bootstrap';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';


type LoginFormValues = {
	email: string,
	password: string
}

const Login : NextPage = () => {
	const router = useRouter();
		
	const onSubmit = async (formValues: LoginFormValues) => {
		try {
			const response = await signIn('credentials', {...formValues, redirect: false});
			console.log(response);
		} catch {
			
		}
	};

	const {register, handleSubmit, formState} = useForm<LoginFormValues>({
		mode: 'onChange'
	});

	return(
		<Container className='w-100 h-100 d-grid align-content-center'>
			<Row className='h-100 align-items-center'>
				<Col xs={12} sm={{span: 8, offset: 2}} md={{span: 6, offset: 3}} lg={{span: 4, offset: 4}}>
					<Card className='p-3'>
						<Image fluid src='/images/logo.png' rounded className='mb-3' alt='logo'/>
						<Form onSubmit={handleSubmit(onSubmit)}>
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

							<Form.Group className='mb-3 d-grid'>
								<Button 
									disabled={!formState.isValid}
									type='submit'
								>Login</Button>
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