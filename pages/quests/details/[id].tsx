import axios from 'axios';
import { ObjectId } from 'mongodb';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Row, Col, Button,Image } from 'react-bootstrap';
import { Layout } from '../../../layout/layout';
import { Quest } from '../../../types/dtos';

const Page : NextPage = () => {
	const router = useRouter();
	const [quest,setQuest] = useState<Quest>();
	const userId : number = 0;
	useEffect(() => {
		(async() => {
			if(router.query.id) {
				const response = await axios.get<Quest>(`/api/quests/get?id=${router.query.id}`);
				setQuest(response.data);
			}
		})();
	}, [router.query.id]);

	const renderSubscribeOrUnsubscribeButton = (questId: ObjectId) => {		
		return <Button href={`/quests/subscribe/${questId}`}>Subscribe</Button>;
	};

	if(!quest) {
		return <></>;
	}

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
							userId === quest.creatorId && (
								<>
									<Button className='mb-2' href={`/quests/edit/${quest._id}`}>Edit</Button>
									<Button variant='danger' className='mb-2' href={`/quests/delete/${quest._id}`}>Delete</Button>
								</>
							)
						}
						{renderSubscribeOrUnsubscribeButton(quest._id)}
						<Button variant='success' onClick={() => router.back()}>Back</Button>
					</div>	
				</Col>
			</Row>
		</Layout>
	);
};

export default Page;