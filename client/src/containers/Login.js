import { Wrapper } from '../components/Wrapper';
import { Box, Button, Link, Stack } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { InputField } from '../components/InputField';
import { useHistory, Link as ReactLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import logo from './Vector.svg';
function Login() {
	const { login, getUser } = useAuth();
	const history = useHistory();
	return (
		<Wrapper variant='small'>
			<Stack align='center' pb={5}>
				<img src={logo} alt='Promptu Logo' />
				<heading id='heading'>promptu</heading>
			</Stack>
			<Box shadow='md' borderWidth='1px' borderRadius='md' p={5} color='white'>
				<Formik
					color='white'
					initialValues={{ email: '', password: '' }}
					onSubmit={async (values, { setErrors }) => {
						try {
							await getUser(values.email);
							await login(values.email, values.password);
							history.push('/');
						} catch {
							setErrors('Failed to log in');
						}
					}}
				>
					{({ isSubmitting }) => (
						<Form color='white'>
							<InputField
								color='white'
								name='email'
								placeholder='email'
								label='Email'
								// color='rgba(255, 255, 255, 0.1)'
							/>
							<Box mt={3}>
								<InputField
									name='password'
									placeholder='password'
									label='Password'
									type='password'
								/>
							</Box>
							<Button
								type='submit'
								colorScheme='red'
								isLoading={isSubmitting}
								mt={4}
							>
								Login
							</Button>
						</Form>
					)}
				</Formik>
			</Box>
			<Box mt={3} ml={5} color='rgba(255,255,255,.8)'>
				Don't have an account yet?{' '}
				<Link
					as={ReactLink}
					to='/register'
					color='rgba(255,255,255,1)'
					fontWeight='semibold'
				>
					Register here.
				</Link>
			</Box>
		</Wrapper>
	);
}

export default Login;
