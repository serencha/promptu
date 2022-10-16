import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { InputField } from './InputField';
import { TextField } from './TextField';
import { DateAndTimePicker } from './DateAndTimePicker';

import { useEffect } from 'react';
import { v4 } from 'uuid';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';

export const OrganizeEvent = (props) => {
	const { currentUser } = useAuth();

	return (
		<Box flex='15'>
			<Formik
				initialValues={{ event: '', hashtag: '', about: '' }}
				onSubmit={async (values, { setErrors }) => {
					db.collection('events')
						.add({
							event: values.event,
							hashtag: values.hashtag,
							about: values.about,
						})
						.then((docRef) => {
							console.log('Document written with ID: ', docRef.id);
						})
						.catch((error) => {
							console.error('Error adding document: ', error);
						});
					props.handleSubmit();
				}}
			>
				{({ isSubmitting }) => (
					<Form>
						<Box
							m={3}
							p={5}
							shadow='md'
							borderWidth='1px'
							borderRadius='md'
							w='100%'
						>
							<Heading>Organize the Future.</Heading>
							<Box mt={3}>
								<InputField
									name='event'
									placeholder='event name'
									label='Event'
								/>
							</Box>
							<Box mt={3}>
								<InputField
									name='hashtag'
									placeholder='#hashtag'
									label='Hash Tag'
								/>
							</Box>
							<Box mt={3}>
								<TextField
									name='about'
									placeholder='why are you fighting?'
									label='About'
									h='30vh'
								/>
							</Box>
							<Button
								type='submit'
								colorScheme='teal'
								isLoading={isSubmitting}
								mt={4}
								size='lg'
							>
								Share With the World!
							</Button>
						</Box>
					</Form>
				)}
			</Formik>
		</Box>
	);
};
