import { faCancel, faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { NextPage } from 'next';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Row, Col, Button, ButtonGroup, Stack } from 'react-bootstrap';
import { ExtendedSession } from '../../../helper/validate-session';
import { Layout } from '../../../layout/layout';
import { Quest } from '../../../models/quest-model';


const Unsubscribe : NextPage = () => {
	const router = useRouter();
	const [quest, setQuest] = useState<Quest>();
	const data = useSession().data as ExtendedSession;
	useEffect(() => {
		(async () => {
			if(router.query.id) {
				const response = await axios.get(`/api/quests/get?id=${router.query.id}`);
				setQuest(response.data);
			}
			
		})();
	}, [router.query.id]);

	if(!quest) {
		return <></>;
	}

	const handleUnsubscribe = async () => {
		const char = quest.subscriber.find(x=>x.name === data.user?.name);
		if(char) {
			await axios.post('/api/quests/unsubscribe', {
				questId: router.query.id,
				subscriberId: char._id
			});
			router.back();    
		}
	};

	return(
		<Layout>
			<Row>
				<Col lg={{span: 6, offset: 3}} md={{span: 8, offset: 2}} >
					<Stack>
						<div className='my-4'>
                            Are you sure to unsubscribe from <b>{quest.name}</b> ?
						</div>
						<ButtonGroup>
							<Button variant='danger' onClick={() => router.back()}> 
								<FontAwesomeIcon icon={faCancel} className='me-2'/>
							Cancel
							</Button>
							<Button onClick={() => handleUnsubscribe()}>  
								<FontAwesomeIcon icon={faCheck} className='me-2'/>
							OK
							</Button>
						</ButtonGroup>
					</Stack>
				</Col>
			</Row>
		</Layout>
	);
};

export default Unsubscribe;