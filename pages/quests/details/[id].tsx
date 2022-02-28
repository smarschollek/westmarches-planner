import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Row, Col, Button,Image, ButtonGroup, ListGroupItem, Badge } from 'react-bootstrap';
import { Layout } from '../../../layout/layout';
import { Quest } from '../../../models/quest-model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink, faUnlink, faAngleLeft, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
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
		if(data.user?.name === quest.creator) {
			return (
				<>
					<Button href={`/quests/edit/${quest._id}`}>
						<FontAwesomeIcon icon={faPen} className='me-2'/>
						Edit
					</Button>
					<Button disabled variant='danger' href={`/quests/delete/${quest._id}`}>
						<FontAwesomeIcon icon={faTrash} className='me-2'/>
						Delete
					</Button>
				</>
				
			);
		}
		
		if(quest.subscriber.findIndex(x=>x.name === data.user?.name) !== -1) {
			return (
				<Button href={`/quests/unsubscribe/${quest._id}`}>
					<FontAwesomeIcon icon={faUnlink} className='me-2'/>
					Unsubscribe
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

	const mapSubscriber = () => {
		return quest.subscriber.map((sub, index) => {
			return (
				<ListGroupItem key={index}>
					<div className='d-flex justify-content-between align-items-center'>
						<span>{sub.characterName}</span>
						<Badge>{`${sub.characterClass} (${sub.characterLevel})`}</Badge>
					</div>
					<div className='fw-bold' style={{fontSize: '0.9rem'}}>
						{sub.name}
					</div>
				</ListGroupItem>
			);
		});
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
					{mapSubscriber()}
					<hr className='my-4'></hr>
					
					<div className='d-grid mt-4'>			

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