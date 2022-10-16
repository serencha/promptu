import { Wrapper } from '../components/Wrapper';
import { Box, Button, Link, Heading } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { InputField } from '../components/InputField';
import { useHistory, Link as ReactLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';

function Login() {
	const { signup } = useAuth();
	const history = useHistory();

	return (
		<Wrapper variant='small'>
			<Heading p={3}>Create an Account</Heading>
			<Box shadow='md' borderWidth='1px' borderRadius='md' p={5}>
				<Formik
					initialValues={{ email: '', password: '', confirmPassword: '' }}
					onSubmit={async (values, { setErrors }) => {
						if (values.password !== values.confirmPassword) {
							return setErrors('Passwords do not match');
						}

						try {
							await signup(values.email, values.password);
							history.push('/');
						} catch {
							setErrors('Failed to create an account');
						}
					}}
				>
					{({ isSubmitting }) => (
						<Form>
							<InputField name='email' placeholder='email' label='Email' />
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
							<Button type='submit' colorScheme='teal' mt={4}>
								Sign Up
							</Button>
						</Form>
					)}
				</Formik>
			</Box>
			<Box mt={3} ml={5}>
				Already have an account?{' '}
				<Link as={ReactLink} to='/login' color='teal'>
					Login here.
				</Link>
			</Box>
		</Wrapper>
	);
}

export default Login;
