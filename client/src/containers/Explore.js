import { Wrapper } from '../components/Wrapper';
import {
	Box,
	IconButton,
	Link,
	Heading,
	Flex,
	Text,
	Spacer,
	Button,
} from '@chakra-ui/react';
import { AiOutlineFire } from 'react-icons/ai';
import { Formik, Form } from 'formik';
import { InputField } from '../components/InputField';
import { useHistory, Link as ReactLink } from 'react-router-dom';
import { formatUsername } from '../utils/formatUsername';
import { useAuth } from '../contexts/AuthContext';
import { useEffect, useState } from 'react';
import logo from './Vector.svg';
import { getPosts } from '../queries/getPosts';
import { getUsers } from '../queries/getUsers';
import { getAllPrompts } from '../queries/getAllPrompts';
import { AudioBox } from '../components/AudioBox';

const Explore = () => {
	const [posts, setPosts] = useState([]);
	const [users, setUsers] = useState([]);
	const [prompts, setPrompts] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const response = await getPosts();
			const users = await getUsers();
			const prompts = await getAllPrompts();
			setPosts(response.data);
			setUsers(users.data);
			setPrompts(prompts.data);
		};
		getData();
	}, []);
	console.log(posts);
	console.log(users);
	console.log(prompts);

	return (
		<Wrapper variant='small' color='white'>
			<Box>
				{posts.map((post) => (
					<Box mb={10}>
						<div className='prompt-audio-posts'>
							{/* <h1>{post.data.storage_link}</h1>
					<h2>{post.id}</h2> */}
							<Flex p={4} bg='rgba(255, 255, 255, 0.1)' color='white'>
								<h2 className='promptdesc'>
									{/* <Heading> */}
									{users.map((user) =>
										user.id == post.data.user ? (
											<div>
												<section>
													{prompts.map((prompt) =>
														post.data.prompt_id == prompt.id ? (
															<Text>{prompt.data.description}:</Text>
														) : (
															<></>
														)
													)}
												</section>

												{
													<AudioBox
														// promptName
														// username={formatUsername(user.data.username)}
														id={post.id}
														username={formatUsername(user.data.username)}
														link={post.data.storage_link}
													/>
												}
											</div>
										) : (
											<></>
										)
									)}
									{/* </Heading> */}
								</h2>
								<Spacer />
								<Flex align='center'>
									{/* <IconButton icon={<AiOutlineFire />}> */}
									<Button border='1px' borderColor='tomato'>
										{post.data.like_count}

										{/* <Box postition='relative'>{post.data.like_count}</Box> */}
									</Button>
									{/* </IconButton> */}
								</Flex>
							</Flex>
						</div>
					</Box>
				))}
			</Box>
		</Wrapper>
	);
};
export default Explore;
