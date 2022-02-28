import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

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
    
	const mapClasses = () => {
		return classes.map((c, index) => {
			return (
				<option value={c} key={index}>{c}</option>
			);
		});
	};

	const {register, handleSubmit, watch, formState} = useForm<CharacterEditFormValues>({
		defaultValues,
		mode: 'onChange'
	});

	const levelValue = watch('level');

	return(
		<Form onSubmit={handleSubmit(onSubmit)}>
			<Form.Group className='mb-3'>
				<Form.Label>Character name:</Form.Label>
				<Form.Control {...register('name', { required: true })}/>
			</Form.Group>
			<Form.Group className='mb-3'>
				<Form.Label>Class:</Form.Label>
				<Form.Select {...register('class', { required: true })}>
					{mapClasses()}
				</Form.Select>
			</Form.Group>
			<Form.Group className='mb-3'>
				<Form.Label>Level: {levelValue}</Form.Label>
				<Form.Range min={1} max={20} {...register('level')}/>
			</Form.Group>
			<Form.Group className='mb-3'>
				<Form.Label>Comment:</Form.Label>
				<Form.Control as='textarea' rows={5} style={{resize: 'none'}} {...register('comment')}/>
			</Form.Group>
			<Form.Group className='d-grid'>
				<Button 
					variant='primary' 
					type='submit' 
					disabled={!formState.isValid}
				>
                    Submit
				</Button>
				<Button variant='danger' className='mt-2' onClick={() => router.back()}>
                    Cancel
				</Button>
			</Form.Group>
		</Form>
	);
};