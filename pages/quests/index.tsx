import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Layout } from '../../layout/layout';
import { Quest } from '../../models/quest-model';
import { Button, ListItemButton, Stack, Typography } from '@mui/material';
import { MyList } from '../../components/my-list';

const Page : NextPage = () => {
	const router = useRouter();
	const [quests, setQuests] = useState<Quest[]>([]);

	useEffect(()=> {
		(async () => {
			const response = await axios.get<Quest[]>('/api/quests/all');
			setQuests(response.data);
		})();
	}, []);

	const handleRenderCallback = (quest: Quest) : JSX.Element => {
		return (
			<ListItemButton component='a' href={`/quests/details/${quest._id}`}>
				{quest.name}
			</ListItemButton>
		);
	};

	if(!quests) {
		return <></>;
	}

	return(
		<Layout>
			<Stack gap={1} sx={{marginTop: 2}}>
				<Typography gutterBottom variant='h6' component='div' sx={{paddingLeft: 2, paddingTop: 1}}>
	  				Quests
				</Typography>
				<MyList items={quests} renderCallback={handleRenderCallback}/>
				<Button 
					variant='contained'
					component='a'
					href='/quests/add'
				> Add Quest </Button>		
			</Stack>			
		</Layout>
	);
};

export default Page;