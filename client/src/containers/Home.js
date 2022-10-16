import { Box, Heading, Text, VStack, HStack, Image } from '@chakra-ui/react';
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
import { Recorder } from 'react-voice-recorder';
import './Recording.css';
const Home = () => {
	const prompts = getPrompts();
	const { currentUserId } = useAuth();
	console.log('bruh');
	console.log(currentUserId);
	const [audioDetails, setAudioDetails] = useState({
		url: null,
		blob: null,
		chunks: null,
		duration: {
			h: 0,
			m: 0,
			s: 0,
		},
	});
	const handleClick = () => {
		console.log('this is:', this);
	};
	const handleAudioStop = (data) => {
		console.log(data);
		this.setState({ audioDetails: data });
	};
	const handleAudioUpload = (file) => {
		console.log(file);
	};
	const handleReset = () => {
		const reset = {
			url: null,
			blob: null,
			chunks: null,
			duration: {
				h: 0,
				m: 0,
				s: 0,
			},
		};
		this.setState({ audioDetails: reset });
	};

	return (
		<Box>
			<div>
				<h1>promptu</h1>
				<h3>of the day</h3>
				<Recorder
					record={false}
					title={'New recording'}
					audioURL={audioDetails}
					showUIAudio
					handleAudioStop={(data) => handleAudioStop(data)}
					handleAudioUpload={(data) => handleAudioUpload(data)}
					handleReset={() => handleReset()}
					mimeTypeToUseWhenRecording={`audio/webm`}
				/>
			</div>
		</Box>
	);
};
export default Home;
// const ContentContainer = (props) => {
// 	const [posts, setPosts] = useState([]);
// 	const [events, setEvents] = useState([]);

// 	useEffect(() => {
// 		fetchEvents();
// 		fetchPosts();
// 	}, []);

// 	const fetchEvents = async () => {
// 		const response = db.collection('events');
// 		const hashtag =
// 			props.hashtag === '*'
// 				? response
// 				: response.where('hashtag', '==', props.hashtag);
// 		const data = await hashtag.get();
// 		data.docs.forEach((item) => {
// 			setEvents((events) => [...events, item.data()]);
// 		});
// 	};

// 	const fetchPosts = async () => {
// 		const response = db.collection('posts');
// 		const hashtag =
// 			props.hashtag === '*'
// 				? response.get()
// 				: response.where('hashtag', '==', props.hashtag).get();
// 		const data = await hashtag;
// 		data.docs.forEach((item) => {
// 			setPosts((posts) => [...posts, item.data()]);
// 		});
// 	};

// 	console.log(events);
// 	console.log(posts);

// 	return (
// 		<HStack spacing={8} flex='15' h='100%' alignItems='flex0-top'>
// 			<Box w='100%'>
// 				<VStack spacing={6} w='100%'>
// 					<Heading>Events</Heading>
// 					{events.map((e) => (
// 						<FeaturedEvent
// 							event={e.event}
// 							about={e.about}
// 							hashtag={e.hashtag}
// 							image={e.image}
// 						/>
// 					))}
// 				</VStack>
// 			</Box>
// 			<Box w='100%'>
// 				<VStack spacing={6} w='100%'>
// 					<Heading>News</Heading>
// 					{posts.map((p) => (
// 						<FeaturedPost
// 							title={p.title}
// 							post={p.post}
// 							hashtag={p.hashtag}
// 							image={p.image}
// 						/>
// 					))}
// 				</VStack>
// 			</Box>
// 		</HStack>
// 	);
// };

// const FeaturedPost = (props) => {
// 	return (
// 		<Box
// 			p={5}
// 			shadow='md'
// 			borderWidth='1px'
// 			borderRadius='md'
// 			bp={2}
// 			width='100%'
// 		>
// 			<Heading fontSize='xl'>{truncate(props.title)}</Heading>
// 			<Text mt={4}>{truncate(props.post)}</Text>
// 		</Box>
// 	);
// };

// const FeaturedEvent = (props) => {
// 	return (
// 		<Box p={5} shadow='md' borderWidth='1px' borderRadius='md' bp={2} w='100%'>
// 			<Heading fontSize='xl'>{truncate(props.event)}</Heading>
// 			<Text mt={4}>{truncate(props.about)}</Text>
// 		</Box>
// 	);
// };

// export default class Home extends React.Component {
// 	state = {
// 		select: 'content',
// 		hashtag: '*',
// 		pictures: '',
// 	};

// 	handleClick = (event) => {
// 		this.setState({ select: event, hashtag: '*' });
// 	};

// 	handleSubmit = () => {
// 		this.setState({ select: 'content', hashtag: '*' });
// 	};

// 	handleChange = (hashtag) => {
// 		this.setState({ select: 'content', hashtag });
// 	};

// 	render() {
// 		let type = <ContentContainer hashtag={this.state.hashtag} />;

// 		if (this.state.select === 'create') {
// 			type = <CreatePost handleSubmit={this.handleSubmit} />;
// 		} else if (this.state.select === 'organize') {
// 			type = <OrganizeEvent handleSubmit={this.handleSubmit} />;
// 		}

// 		return (
// 			<Wrapper d='flex' alignItems='flex-start'>
// 				<HStack spacing={8}>
// 					<Navbar
// 						flex='6'
// 						handleClick={this.handleClick}
// 						handleChange={this.handleChange}
// 					/>
// 					{type}
// 				</HStack>
// 			</Wrapper>
// 		);
// 	}
// }
