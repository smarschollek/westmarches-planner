import axios from 'axios';
import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { UploadFileFormControl } from './upload-file-formcontrol';
import { Button, Card, CardContent, CardMedia, FormControl, MenuItem, Select, Stack, TextField } from '@mui/material';
import { Place } from '../modules/places/place-types';

export type QuestEditFormValues = {
	name: string,
	description: string,
	placeId: string,
	imageGuid: string
	questState: string
}

type QuestEditProps = {
	defaultValues: QuestEditFormValues,
	places: Place[]
	onSubmit: (formValues: QuestEditFormValues) => void
}

const questStates = [
	'Planning',
	'Open',
	'Close'
];

export const QuestEdit = ({defaultValues, places, onSubmit} : QuestEditProps): ReactElement => {
	const router = useRouter();
	const [uploading, setUploading] = useState(false);
	const [imageGuid, setImageGuid] = useState(defaultValues?.imageGuid ?? '');

	const { control, handleSubmit, setValue, formState } = useForm<QuestEditFormValues>({
		defaultValues,
		mode: 'onChange'
	});

	const handleOnUploadFinished = (guid: string) => {
		setImageGuid(guid);
		setValue('imageGuid', guid);
		setUploading(false);
	};

	if(!places) {
		return <>Loading</>;
	}

	if(places.length === 0) {
		return <>No Places</>;
	}
    
	return(
		<form onSubmit={handleSubmit(onSubmit)} style={{marginTop: 16}}>
			<Card>
				{
					defaultValues?.imageGuid && (
						<CardMedia
							component='img'
							image={`/api/images/${imageGuid}`}
							sx={{maxHeight: 400, objectFit: 'contain'}}
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
							render={({field}) => (
								<FormControl fullWidth>
									<Select
										value={field.value}
										onChange={field.onChange}
									>
										{ questStates.map((value, index) => {
											return <MenuItem  key={index} value={value}>{value}</MenuItem>;
										}) }
									</Select>
								</FormControl>)}
							control={control}
							name='questState'
							defaultValue={defaultValues.questState}
						/>
						<Controller
							render={({field}) => (
								<FormControl fullWidth>
									<Select
										value={field.value}
										onChange={field.onChange}
									>
										{ places.map((place, index) => {
	 										return <MenuItem key={index} value={place._id.toString()}>{place.name}</MenuItem>;
	 									}) }
									</Select>
								</FormControl>)}
							control={control}
							name='placeId'
							defaultValue={defaultValues.placeId}
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
							disabled={!formState.isValid || uploading}
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