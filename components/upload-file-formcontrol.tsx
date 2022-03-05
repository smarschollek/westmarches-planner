import { Input, InputBase, Stack } from '@mui/material';
import axios from 'axios';
import { ChangeEvent, ReactElement, useState } from 'react';
import { Form, Spinner } from 'react-bootstrap';

const supportedMedia = ['image/webp', 'image/jpeg', 'image/png'];

type UploadFileFormControlProps = {
	onUploadStarted?: () => void
    onUploadFinished: (imageGuid: string) => void
    accept?: string
}

export const UploadFileFormControl = ({onUploadFinished, onUploadStarted, accept} : UploadFileFormControlProps): ReactElement => {
	const [error, setError] = useState('');
	const [uploading, setUploading] = useState(false);
	
	const handleUploadImage = async (event: ChangeEvent<any>) => {
		event.preventDefault();
		setError('');
		const files = event.target.files as FileList;
		
		if(files.length > 0) {
			const file = files[0];			

			if(!supportedMedia.includes(file.type)) {
				setError('unsupported media type');
				return;
			}

			if(file.size > 1024000) {
				setError('file is to large');
				return;
			}

			try {
				const headers = {
					'Content-Type': 'multipart/form-data'
				};
				console.table(file);
				const formData: FormData = new FormData();
				formData.append('upload', file);

				setUploading(true);
				onUploadStarted && onUploadStarted();

				axios.post<{guid: string}>('/api/images/upload', formData, {headers})
					.then(response => {
						onUploadFinished(response.data.guid);
						setUploading(false);
					});
				
			} catch (error) {
				console.log(error);
			} 
		}
	};

	const renderText = () => {
		if(uploading) {
			return (
				<div className='d-flex justify-content-center align-items-center mt-2'>
					<span className='me-2 fw-bold'>
						Uploading...
					</span>
					<Spinner animation='border' />
				</div>
			);
		}
		
		if(error) {
			return(
				<Form.Label className='text-danger fw-bold mt-1'>
					{error}
				</Form.Label>
			);
		}

		return (
			<Form.Text className='text-muted'>
				supported formats ( jpg, png, webp ) - max file site: 1MB
			</Form.Text>
		);
	};

	return(
	// <Form.Group className='mb-3'>
	// 	<Form.Label>Image</Form.Label>
	// 	<Form.Control type='file' onChange={handleUploadImage} accept={accept}/>
	// 	{renderText()}
	// </Form.Group>

		<Stack gap={1}>
			<input type='file' onChange={handleUploadImage} accept={accept}/>
			{renderText()}
		</Stack>
	);
};

