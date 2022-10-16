import { Wrapper } from '../components/Wrapper';
import { Box, Button, Link, Heading } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { InputField } from '../components/InputField';
import { useHistory, Link as ReactLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

function Register() {
	const { signup, createUser } = useAuth();
	const history = useHistory();

	return (
		<Wrapper variant='small'>
			<Heading p={3} color='white'>
				Create an Account
			</Heading>
			<Box shadow='md' borderWidth='1px' borderRadius='md' p={5} color='white'>
				<Formik
					color='white'
					initialValues={{
						username: '',
						email: '',
						password: '',
						confirmPassword: '',
					}} // bruh
					onSubmit={async (values, { setErrors }) => {
						if (values.password !== values.confirmPassword) {
							return setErrors('Passwords do not match');
						}

						try {
							await createUser(values.username);
							await signup(values.email, values.password);
							// todo -> add username
							history.push('/');
						} catch {
							setErrors('Failed to create an account');
						}
					}}
				>
					{({ isSubmitting }) => (
						<Form color='white'>
							<InputField
								name='username'
								placeholder='username'
								label='Username'
							/>
							<Box mt={3}>
								<InputField name='email' placeholder='email' label='Email' />
							</Box>
							<Box mt={3}>
								<InputField
									name='password'
									placeholder='password'
									label='Password'
									type='password'
								/>
							</Box>
							<Box mt={3}>
								<InputField
									name='confirmPassword'
									placeholder='confirm password'
									label='Confirm Password'
									type='password'
								/>
							</Box>
							<Button type='submit' colorScheme='red' mt={4}>
								Sign Up
							</Button>
						</Form>
					)}
				</Formik>
			</Box>
			<Box mt={3} ml={5} color='rgba(255,255,255,.8)'>
				Already have an account?{' '}
				<Link
					as={ReactLink}
					to='/login'
					color='rgba(255,255,255,1)'
					fontWeight='semibold'
				>
					Login here.
				</Link>
			</Box>
		</Wrapper>
	);
}

export default Register;
