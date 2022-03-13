import { ListItemButton } from '@mui/material';
import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { SessionDaySelection } from '../../../components/session-day-selection';
import { Layout } from '../../../layout/layout';
import { SessionInfoResponse } from '../../api/quests/sessioninfo';

const Page : NextPage = () => {
	const router = useRouter();
	const [sessionInfos, setSessionInfos] = useState<SessionInfoResponse>();
    
	useEffect(() => {
		(async () => {
			const {id} = router.query;
			if(id) {
				const response = await axios.get(`/api/quests/sessioninfo?id=${id}`);
				setSessionInfos(response.data);
			}
		})();
	}, [router.query]);


	const handleOnDaySelection = (day: string) => {
		return (
			<ListItemButton>
				{day}
			</ListItemButton>
		);
	};

	return(
		<Layout>
            create session
			<SessionDaySelection days={[]} onDaySelection={handleOnDaySelection}/>
		</Layout>
	);
};

export default Page;