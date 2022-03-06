import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Card, CardContent, CardMedia, FormControl, MenuItem, Select, Stack, TextField } from '@mui/material';

const classes: string[] = [
	'Artificer',
	'Barbarian',
	'Bard',
	'Cleric',
	'Druid',
	'Fighter',
	'Monk',
	'Paladin',
	'Ranger',
	'Rogue',
	'Sorcerer',
	'Warlock',
	'Wizard',
];

export type CharacterEditFormValues = {
    name: string,
    class: string,
    level: number,
    comment: string
}

type CharacterEditProps = {
    defaultValues?: CharacterEditFormValues
    onSubmit: (formValues: CharacterEditFormValues) => void
}

export const CharacterEdit = ({defaultValues, onSubmit}: CharacterEditProps): ReactElement => {
	const router = useRouter();
    
	const {control, handleSubmit, watch, formState} = useForm<CharacterEditFormValues>({
		defaultValues,
		mode: 'onChange'
	});

	const levelValue = watch('level');

	return(
		// <Form onSubmit={handleSubmit(onSubmit)}>
		// 	<Form.Group className='mb-3'>
		// 		<Form.Label>Character name:</Form.Label>
		// 		<Form.Control {...register('name', { required: true })}/>
		// 	</Form.Group>
		// 	<Form.Group className='mb-3'>
		// 		<Form.Label>Class:</Form.Label>
		// 		<Form.Select {...register('class', { required: true })}>
		// 			{mapClasses()}
		// 		</Form.Select>
		// 	</Form.Group>
		// 	<Form.Group className='mb-3'>
		// 		<Form.Label>Level: {levelValue}</Form.Label>
		// 		<Form.Range min={1} max={20} {...register('level')}/>
		// 	</Form.Group>
		// 	<Form.Group className='mb-3'>
		// 		<Form.Label>Comment:</Form.Label>
		// 		<Form.Control as='textarea' rows={5} style={{resize: 'none'}} {...register('comment')}/>
		// 	</Form.Group>
		// 	<Form.Group className='d-grid'>
		// 		<ButtonGroup>
		// 			{/* <Button 
		// 				variant='primary' 
		// 				type='submit' 
		// 				disabled={!formState.isValid}
		// 			>
	//             Submit
		// 			</Button>
		// 			<Button variant='danger' onClick={() => router.back()}>
	//             Cancel
		// 			</Button> */}
		// 			<Button variant='danger' onClick={() => router.back()}>
		// 				<FontAwesomeIcon icon={faCancel} className='me-2'/>
		// 						Cancel
		// 			</Button>
		// 			<Button type='submit' disabled={!formState.isValid}>
		// 				<FontAwesomeIcon icon={faSave} className='me-2'/>
		// 						Save
		// 			</Button>
		// 		</ButtonGroup>
		// 	</Form.Group>
		// </Form>
		<form onSubmit={handleSubmit(onSubmit)} style={{marginTop: 16}}>
			<Card>
				<CardContent>
					<Stack gap={2}>
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
										{ classes.map((value, index) => {
											return <MenuItem  key={index} value={value}>{value}</MenuItem>;
										}) }
									</Select>
								</FormControl>)}
							control={control}
							name='class'
							defaultValue={defaultValues?.class}
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
							name='comment'
							defaultValue={defaultValues?.comment}
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