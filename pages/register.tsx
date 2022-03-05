import { Grid, CardContent, TextField,Card, Stack, Button } from '@mui/material';
import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';

export type RegisterFormValues = {
    name: string,
    email: string,
    password: string
}

const Register : NextPage = () => {
	const router = useRouter();

	const onSubmit = async (formValues: RegisterFormValues) => {
		axios.post('/api/auth/register', formValues);
		router.push('/login');
	};

	const {register, handleSubmit, formState} = useForm<RegisterFormValues>({
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
				<CardContent>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Stack gap={2}>
							<TextField 
								id='input-name' 
								type='text'
								label='Name'
					  			variant='standard'
								inputProps={{
									autocomplete: 'off',
								}}
								{...register('name', {required: true})}
							/>
							<TextField 
								id='input-email' 
								type='email'
								label='Email'
					  			variant='standard'
								inputProps={{
									autocomplete: 'off',
								}}
								{...register('email', {required: true})}
							/>
							<TextField 
								id='input-password' 
								type='password' 
								label='Password' 
								variant='standard' 
								{...register('password', {required: true})}
							/>
							<Button 
								type='submit'
								variant='contained'
								disabled={!formState.isValid}
							>
								Register
							</Button>
							<Button variant='contained' color='secondary' href='/login'>Back</Button>
						</Stack>
					</form>
				</CardContent>
			</Card>
		</Grid>
	);
};
export default Register;