import axios from 'axios';
import { ChangeEvent, ReactElement } from 'react';
import { Form, Col } from 'react-bootstrap';

type UploadFileFormControlProps = {
    onUploadFinished: (imageGuid: string) => void
    accept?: string
}

export const UploadFileFormControl = ({onUploadFinished, accept} : UploadFileFormControlProps): ReactElement => {
	const handleUploadImage = async (event: ChangeEvent<any>) => {
		event.preventDefault();
		const files = event.target.files as FileList;
		
		if(files.length > 0) {
			const file = files[0];			
			try {
				const headers = {
					'Content-Type': 'multipart/form-data'
				};

				const formData: FormData = new FormData();
				formData.append('upload', file);

				const response = await axios.post<{guid: string}>('/api/images/upload', formData, {headers});
				onUploadFinished(response.data.guid);
			} catch (error) {
				console.log(error);
			} 
		}
	};

	return(
		<Form.Group className='mb-3' as={Col} lg={{ span: 4, offset: 2 }}>
			<Form.Label>Image</Form.Label>
			<Form.Control type='file' onChange={handleUploadImage} accept={accept}/>
		</Form.Group>
	);
};

