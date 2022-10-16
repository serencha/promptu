import axios from 'axios';
const url = 'https://us-central1-promptu-1caad.cloudfunctions.net/getPosts';
export const getPosts = async () => {
	return await axios({
		method: 'get',
		url,
	});
};
