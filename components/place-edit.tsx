import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import { Button, Col, Form, Row, Image} from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { UploadFileFormControl } from './upload-file-formcontrol';

export type PlaceEditForm = {
    name: string,
    description: string,
	imageGuid: string
}

type PlaceEditProps = {
	defaultValues?: PlaceEditForm
	onSubmit: (formValues: PlaceEditForm) => void
}

export const PlaceEdit = ({defaultValues, onSubmit} : PlaceEditProps): ReactElement => {
	const router = useRouter();

	const [imageGuid, setImageGuid] = useState(defaultValues?.imageGuid ?? '');

	const { register, handleSubmit, setValue } = useForm<PlaceEditForm>({
		defaultValues
	});

	const handleOnUploadFinished = (guid: string) => {
		setValue('imageGuid', guid);
		setImageGuid(guid);
	};

	return(
		<Form className='mt-3' onSubmit={handleSubmit(onSubmit)}>
			<Row>
				<Col lg={{span: 6, offset: 3}} md={{span: 8, offset: 2}} >
					{
						imageGuid && (
							<div className='d-flex justify-content-center'>
								<Image fluid src={`/api/images/${imageGuid}`} rounded alt='place' style={{maxHeight: '400px'}}/>
							</div>
						)
					}

					<UploadFileFormControl onUploadFinished={handleOnUploadFinished} accept='image/*'/>

					<Form.Group className='mb-3'>
						<Form.Label>Titel</Form.Label>
						<Form.Control type='text' {...register('name')}/>
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