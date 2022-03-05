import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { UploadFileFormControl } from './upload-file-formcontrol';
import { Button, Card, CardContent, CardMedia, Stack, TextField } from '@mui/material';

export type PlaceEditForm = {
    name: string,
    description: string,
	imageGuid: string
}

type PlaceEditProps = {
	defaultValues: PlaceEditForm
	onSubmit: (formValues: PlaceEditForm) => void
}

export const PlaceEdit = ({defaultValues, onSubmit} : PlaceEditProps): ReactElement => {
	const router = useRouter();
	const [uploading, setUploading] = useState(false);

	const [imageGuid, setImageGuid] = useState(defaultValues?.imageGuid ?? '');

	const { control, handleSubmit, setValue, formState } = useForm<PlaceEditForm>({
		defaultValues,
		mode: 'onChange'
	});

	const handleOnUploadFinished = (guid: string) => {
		setValue('imageGuid', guid);
		setImageGuid(guid);
		setUploading(false);
	};

	return(
		<form onSubmit={handleSubmit(onSubmit)} style={{marginTop: 16}}>
			<Card>
				{
					defaultValues?.imageGuid && (
						<CardMedia
							component='img'
							image={`/api/images/${imageGuid}`}
						/>
					)
				}

				<CardContent>
					<Stack gap={2}>
						<UploadFileFormControl onUploadStarted={() => setUploading(true)} onUploadFinished={handleOnUploadFinished} accept='image/*'/>
						<Controller
							render={({field, fieldState}) => (
								<TextField fullWidth id='input-name' placeholder='Name' 
									value={field.value}
									onChange={field.onChange}
									label={'Name'}
									error={!!fieldState.error}
									helperText={fieldState.error && 'Error'}
								/>
							)}
							control={control}
							name='name'
							rules={{required: true}}
						/>
						<Controller
							render={({field, fieldState}) => (
								<TextField fullWidth id='input-description' 
									value={field.value}
									onChange={field.onChange}	
									placeholder='Description' 
									multiline minRows={5} maxRows={15}
									label={'Description'}
									error={!!fieldState.error}
									helperText={fieldState.error && 'Error'}
								/>)}
							control={control}
							name='description'
							defaultValue={defaultValues?.description}
						/>
						
						<Button 
							type='submit'
							variant='contained'
							disabled={!formState.isValid}
						>
								Save
						</Button>
						<Button variant='contained' color='secondary' onClick={() => router.back()}>Cancel</Button>
					</Stack>
				</CardContent>
			</Card>
		</form>
	);
};