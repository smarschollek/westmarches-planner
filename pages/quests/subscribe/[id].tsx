import axios from 'axios';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Row, Col, Button, Form, ButtonGroup } from 'react-bootstrap';
import { useForm, useFormState } from 'react-hook-form';
import { Layout } from '../../../layout/layout';
import { Character } from '../../../models/user-model';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faCancel} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { WeekTimeSelection } from '../../../components/week-time-selection';

type QuestSubscribeFromValues = {
    characterId: string
}

const Subscribe : NextPage = () => {
	const [characters, setCharacters] = useState<Character[]>([]);
	const [fetched, setFetched] = useState(false);
	const router = useRouter();

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get<Character[]>('/api/users/getCharacters');
				setCharacters(response.data);
				setFetched(true);
			} catch (error) {
				console.log(error);
			}
		})();
	}, []);
	
	const mapCharacters = (characters: Character[]) => {
		return characters.map((character, index) => {
			return <option key={index} value={character._id}>{character.name}</option>;
		});
	};

	const onSubmit = async (formValues: QuestSubscribeFromValues)  => {
		if(router.query.id) {
			await axios.post('/api/quests/subscribe', {
				questId: router.query.id,
				characterId: formValues.characterId
			});
			router.back();
		}
	};

	const {register, handleSubmit, formState} = useForm<QuestSubscribeFromValues>({
		mode: 'onChange',
		defaultValues: {
			characterId: ''
		}
	});

	if(fetched && characters.length === 0) {
		return (
			<Layout>
				<Row>
					<Col lg={{span: 6, offset: 3}} md={{span: 8, offset: 2}} >
						You need Characters to subscribe to a Quest. Create one <Link href='/user'>here</Link>
					</Col>
				</Row>
			</Layout>
		);
	}

	return (
		<Layout>
			<Row>
				{/* <Col lg={{span: 6, offset: 3}} md={{span: 8, offset: 2}} >
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Group>
							<Form.Label>Character</Form.Label>
							<Form.Select {...register('characterId', {required: true})}>
								<option value={''}></option>;
								{mapCharacters(characters)}
							</Form.Select>
						</Form.Group>
						<Form.Group className='d-grid mt-4'>
							<ButtonGroup>
								<Button variant='danger' onClick={() => router.back()}> 
									<FontAwesomeIcon icon={faCancel} className='me-2'/>
									Cancel
								 </Button>
								<Button
									type='submit'
									disabled={!formState.isValid}
								> 
									<FontAwesomeIcon icon={faSave} className='me-2'/>
									Subscribe 
								</Button>
							</ButtonGroup>
						</Form.Group>
					</Form>
				</Col> */}
				<WeekTimeSelection />
			</Row>
		</Layout>
	);
};

export default Subscribe;