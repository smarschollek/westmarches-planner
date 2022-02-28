import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Row, Col, Button,Image, ButtonGroup } from 'react-bootstrap';
import { Layout } from '../../../layout/layout';
import { Quest } from '../../../models/quest-model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faUnlink, faAngleLeft, faPen } from '@fortawesome/free-solid-svg-icons';
import { ExtendedSession } from '../../../helper/validate-session';
import { useSession } from 'next-auth/react';

const Page : NextPage = () => {
	const router = useRouter();
	const [quest,setQuest] = useState<Quest>();
	const data = useSession().data as ExtendedSession;

	useEffect(() => {
		(async() => {
			if(router.query.id) {
				const response = await axios.get<Quest>(`/api/quests/get?id=${router.query.id}`);
				setQuest(response.data);
			}
		})();
	}, [router.query.id]);

	if(!quest) {
		return <></>;
	}

	const renderSubscribeOrUnsubscribeButton = () => {				
		if(data.id === quest.creatorId) {
			return (
				<Button href={`/quests/edit/${quest._id}`}>
					<FontAwesomeIcon icon={faPen} className='me-2'/>
					Edit
				</Button>
			);
		}
		
		return (
			<Button href={`/quests/subscribe/${quest._id}`}>
				<FontAwesomeIcon icon={faLink} className='me-2'/>
				Subscribe
			</Button>
		);
	};

	return(
		<Layout>
			<Row>
				<Col lg={{span: 6, offset: 3}} md={{span: 8, offset: 2}} >
					<h4>{quest.name}</h4>
					<hr className='my-4'></hr>
					{
						quest.imageGuid && (
							<div className='d-flex justify-content-center'>
								<Image fluid style={{maxHeight: '500px'}} rounded src={`/api/images/${quest.imageGuid}`} alt='quest'/>
							</div>
						)
					}
					<hr className='my-4'></hr>
					<h6>Description</h6>
					<div>{quest.description}</div>
					<hr className='my-4'></hr>

					<div className='d-grid mt-4'>
						{
							// userId === quest.creatorId && (
							// 	<>
							// 		<Button className='mb-2' href={`/quests/edit/${quest._id}`}>Edit</Button>
							// 		<Button variant='danger' className='mb-2' href={`/quests/delete/${quest._id}`}>Delete</Button>
							// 	</>
							// )
						}
						

						<ButtonGroup>
							<Button variant='success' onClick={() => router.back()}>
								<FontAwesomeIcon icon={faAngleLeft} className='me-2'/>
								Back
							</Button>
							{renderSubscribeOrUnsubscribeButton()}
						</ButtonGroup>
					</div>	
				</Col>
			</Row>
		</Layout>
	);
};

export default Page;