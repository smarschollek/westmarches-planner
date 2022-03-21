import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { getSession, signIn } from 'next-auth/react';
import { Button, Card, CardContent, CardMedia, Grid, Stack, SvgIcon, TextField } from '@mui/material';
import { useEffect, useState } from 'react';


const Login : NextPage = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		(async () => {
			const session = await getSession();
			if(session) {
				router.replace('/');
			} else {
				setLoading(false);
			}
		})();

	}, [router]);

	if(loading) {
		return <></>;
	}

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
					<Stack gap={2}>
						<Button 
							type='submit'
							variant='contained'
							onClick={() => signIn()}
							startIcon={<SvgIcon viewBox='0 0 50 50' htmlColor='white'>
								<path d='M41.626,10.768C37.644,7.567,31.347,7.025,31.08,7.003c-0.42-0.036-0.819,0.202-0.992,0.587c-0.012,0.025-0.15,0.34-0.303,0.833c2.633,0.443,5.867,1.339,8.794,3.155c0.469,0.291,0.613,0.907,0.322,1.377c-0.189,0.305-0.516,0.473-0.851,0.473c-0.18,0-0.362-0.048-0.526-0.15C32.494,10.158,26.209,10,25,10s-7.495,0.158-12.523,3.278c-0.47,0.292-1.086,0.147-1.377-0.322c-0.292-0.47-0.147-1.086,0.322-1.377c2.927-1.815,6.16-2.712,8.794-3.155c-0.154-0.493-0.292-0.808-0.303-0.833c-0.173-0.386-0.571-0.629-0.993-0.587c-0.266,0.021-6.563,0.563-10.598,3.809C6.213,12.76,2,24.152,2,34c0,0.174,0.045,0.344,0.131,0.495c2.909,5.109,10.842,6.447,12.649,6.504C14.791,41,14.801,41,14.812,41c0.319,0,0.62-0.152,0.809-0.411l1.829-2.513c-4.933-1.276-7.453-3.439-7.598-3.568c-0.414-0.365-0.453-0.997-0.087-1.411c0.365-0.414,0.995-0.453,1.41-0.089C11.236,33.062,15.875,37,25,37c9.141,0,13.782-3.953,13.828-3.993c0.414-0.359,1.045-0.323,1.409,0.094c0.364,0.414,0.325,1.043-0.088,1.407c-0.146,0.129-2.666,2.292-7.599,3.568l1.829,2.513C34.568,40.848,34.869,41,35.188,41c0.011,0,0.021,0,0.031-0.001c1.809-0.057,9.741-1.395,12.649-6.504C47.955,34.344,48,34.174,48,34C48,24.152,43.787,12.76,41.626,10.768z M18.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C22,28.209,20.433,30,18.5,30z M31.5,30c-1.933,0-3.5-1.791-3.5-4c0-2.209,1.567-4,3.5-4s3.5,1.791,3.5,4C35,28.209,33.433,30,31.5,30z'/>
							</SvgIcon>}
						>
								Login with Discord
						</Button>
					</Stack>
				</CardContent>
			</Card>
		</Grid>
	);
};

export default Login;