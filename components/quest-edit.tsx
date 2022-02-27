import axios from 'axios';
import { useRouter } from 'next/router';
import { ReactElement, useEffect, useState } from 'react';
import { Form, Row, Col, Button, Image } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Place, Quest } from '../types/dtos';
import { UploadFileFormControl } from './upload-file-formcontrol';

export type QuestEditFormValues = {
	name: string,
	description: string,
	placeId: string,
	imageGuid: string
	questState: string
}

type QuestEditProps = {
	defaultValues?: Quest
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
								<Image fluid src={`/uploads/${imageGuid}`} style={{maxHeight: '500px'}} alt='quest'/>
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
								return <option key={index} value={place._id}>{place.name}</option>;
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
						<Button type='submit' className='mb-3'>Save</Button>
						<Button variant='danger' onClick={() => router.back()}>Cancel</Button>
					</Form.Group>
				</Col>
			</Row>
		</Form>
	);
};