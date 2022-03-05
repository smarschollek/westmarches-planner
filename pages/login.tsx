import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { signIn, SignInResponse } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { Box, Button, Card, CardContent, CardMedia, Container, Grid, Stack, TextField } from '@mui/material';

type LoginFormValues = {
	email: string,
	password: string
}

const Login : NextPage = () => {
	const router = useRouter();
		
	const onSubmit = async (formValues: LoginFormValues) => {
		try {
			const response = await signIn('credentials', {...formValues, redirect: false});
			if(response) {
				const signInResponse = response as SignInResponse;
				if(signInResponse.error) {
					alert(signInResponse.error);
				} else {
					router.push('/');
				}
			}
		} catch {
			
		}
	};

	const {register, handleSubmit, formState} = useForm<LoginFormValues>({
		mode: 'onChange'
	});

	return(	
		<Grid container
			direction='row'
			justifyContent='center'
			alignItems='center'
			sx={{height: '100%'}}
		>
			<Card sx={{minWidth: '330px'}}>
				<CardMedia
					component='img'
					alt='logo'
					height='110'
					image='/images/logo.png'
				/>
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Stack gap={2}>
							<TextField 
								id='input-email' 
								type='email'
								placeholder='Email'
								{...register('email', {required: true})}
							/>
							<TextField 
								id='input-password' 
								type='password' 
								placeholder='Password' 
								
								{...register('password', {required: true})}
							/>
							<Button 
								type='submit'
								variant='contained'
								disabled={!formState.isValid}
							>
								Login
							</Button>
							<Button variant='contained' color='secondary' href='/register'>Register</Button>
						</Stack>
					</form>
				</CardContent>
			</Card>
		</Grid>
	);
};

export default Login;