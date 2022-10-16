import {
	Box,
	Text,
	VStack,
	HStack,
	Image,
	Heading,
	Flex,
	Center,
	Stack,
	Spacer,
	Spinner,
} from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import React from 'react';
import { CreatePost } from '../components/CreatePost';
import { OrganizeEvent } from '../components/OrganizeEvent';
import { Navbar } from '../components/Navbar';
import { useEffect, useState } from 'react';
import { truncate } from '../utils/truncate';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { getPrompts } from '../queries/getPrompts';
import { Recording } from '../components/Recording';
import { useHistory } from 'react-router-dom';
import logo from './Vector.svg';

const Home = (props) => {
	const [descriptions, setDescriptions] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const response = await getPrompts();
			setDescriptions(response.data);
		};
		getData();
	}, []);

	console.log(descriptions.length != 0 ? descriptions[0].description : 'hey');
	return (
		<Wrapper variant='small' color='white'>
			<Stack align='center'>
				<Flex align='center'>
					<Box w='50%'>
						<img src={logo} alt='Promptu Logo' />
					</Box>
					<Spacer />
					<Box color='white'>
						<Heading>Promptu</Heading>
						<Text>of the day:</Text>
					</Box>
				</Flex>
				<Spacer />
				<Box color='white'>
					{descriptions.length == 0 ? (
						<Spinner />
					) : (
						<Text fontWeight='extrabold'>{descriptions[0].description}!</Text>
					)}
				</Box>
				<Recording />
			</Stack>
		</Wrapper>
	);
};
export default Home;
