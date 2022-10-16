import axios from 'axios';
const url = 'https://us-central1-promptu-1caad.cloudfunctions.net/getPrompts';
export const getPrompts = async () => {
	return await axios({
		method: 'get',
		url,
	});
};
