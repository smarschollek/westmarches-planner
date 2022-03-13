import { Container, Divider, Stack } from '@mui/material';
import { NextPage } from 'next';

const Page : NextPage = () => {
	return(
		<Container sx={{height: '100%'}}>
			<Stack height='100%'alignItems='center' justifyContent='center'>
				<Stack direction='row' gap={1}>
					<b>404</b>
					<Divider orientation='vertical'/>
                    This page could not be found.
				</Stack>
			</Stack>
		</Container>
		
	);
};

export default Page;