import { Button, Input, LinearProgress, Stack, Typography } from '@mui/material';
import axios from 'axios';
import { ChangeEvent, ReactElement, useState } from 'react';

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
					<LinearProgress />
				</div>
			);
		}
		
		if(error) {
			return(
				<Typography variant='caption' color='error'>
					{error}
				</Typography>
			);
		}

		return (
			<Typography variant='caption'>
				supported formats ( jpg, png, webp ) - max file site: 1MB
			</Typography>
		);
	};

	return(
		<Stack gap={1}>
			<label htmlFor='contained-button-file'>
				<input hidden accept='image/*' id='contained-button-file' type='file' onChange={handleUploadImage}/>
				<Button variant='contained' component='span'>Upload Image</Button>
			</label>
			{renderText()}
		</Stack>
	);
};

