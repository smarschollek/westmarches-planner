import { Box, Modal, Stack } from '@mui/material';
import { ReactElement, useEffect, useState } from 'react';

const style = {
	position: 'absolute' as 'absolute',
	top: '20%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
};

interface MyModalProps {
    content: JSX.Element
    open: boolean
}

export const MyModal = ({content, open} : MyModalProps): ReactElement => {
	const [modalOpen, setModalOpen] = useState(open);

	useEffect(() => {
		setModalOpen(open);
	}, [open]);

	return(
		<Modal
			open={modalOpen}
			onClose={() => setModalOpen(false)}	>
			<Box sx={style}>
				{content}
			</Box>
		</Modal>
	);
};