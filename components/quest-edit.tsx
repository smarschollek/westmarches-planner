import axios from 'axios';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { Form, Row, Col, Button, Image, ButtonGroup } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Place } from '../models/place-model';
import { UploadFileFormControl } from './upload-file-formcontrol';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faCancel} from '@fortawesome/free-solid-svg-icons';

export type QuestEditFormValues = {
	name: string,
	description: string,
	placeId: string,
	imageGuid: string
	questState: string
}

type QuestEditProps = {
	defaultValues?: QuestEditFormValues
	onSubmit: (formValues: QuestEditFormValues) => void
}

const questStates = [
	'Planning',
	'Open',
	'Close'
];

export const QuestEdit = ({defaultValues, onSubmit} : QuestEditProps): ReactElement => {
	const router = useRouter();
	const [places, setPlaces] = useState<Place[]>();
	const [imageGuid, setImageGuid] = useState(defaultValues?.imageGuid ?? '');

	const { register, handleSubmit, setValue } = useForm<QuestEditFormValues>({
		defaultValues
	});


	useEffect(() => {
		(async () => {
			const response = await axios.get<Place[]>('/api/places/all');
			setPlaces(response.data);
		})();
	}, []);

	const handleOnUploadFinished = (guid: string) => {
		setImageGuid(guid);
		setValue('imageGuid', guid);
	};

	if(!places) {
		return <>Loading</>;
	}

	if(places.length === 0) {
		return <>No Places</>;
	}
    
	return(
		<Form className='mt-3' onSubmit={handleSubmit(onSubmit)}>
			<Row>
				<Col lg={{span: 6, offset: 3}} md={{span: 8, offset: 2}} >
					{
						imageGuid && (
							<div className='d-flex justify-content-center'>
								<Image fluid src={`/api/images/${imageGuid}`} style={{maxHeight: '500px'}} alt='quest'/>
							</div>
						)
					}

					<UploadFileFormControl onUploadFinished={handleOnUploadFinished} accept='image/*'/>

					<Form.Group className='mb-3'>
						<Form.Label>Titel</Form.Label>
						<Form.Control type='text' {...register('name')}/>
					</Form.Group>

					<Form.Group className='mb-3'>
						<Form.Label>Place</Form.Label>
						<Form.Select {...register('placeId')}>
							{ places.map((place, index) => {
								return <option key={index} value={place._id.toString()}>{place.name}</option>;
							}) }
						</Form.Select>
					</Form.Group>

					<Form.Group className='mb-3'>
						<Form.Label>Status</Form.Label>
						<Form.Select {...register('questState')}>
							{ questStates.map((value, index) => {
								return <option key={index} value={value}>{value}</option>;
							}) }
						</Form.Select>
					</Form.Group>

					<Form.Group className='mb-3'>
						<Form.Label>Description</Form.Label>
						<Form.Control as='textarea' {...register('description')} rows={5} style={{resize: 'none'}}/>
					</Form.Group>

					<Form.Group className='mb-3 d-grid'>
						<ButtonGroup>
							<Button variant='danger' onClick={() => router.back()}>
								<FontAwesomeIcon icon={faCancel} className='me-2'/>
								Cancel
							</Button>
							<Button type='submit'>
								<FontAwesomeIcon icon={faSave} className='me-2'/>
								Save
							</Button>
						</ButtonGroup>
					</Form.Group>
				</Col>
			</Row>
		</Form>
	);
};