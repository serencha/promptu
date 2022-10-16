import axios from 'axios';
const url =
	'https://us-central1-promptu-1caad.cloudfunctions.net/getAllPrompts';
export const getAllPrompts = async () => {
	return await axios({
		method: 'get',
		url,
	});
};
