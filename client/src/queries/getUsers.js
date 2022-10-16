import axios from 'axios';
const url = 'https://us-central1-promptu-1caad.cloudfunctions.net/getUsers';
export const getUsers = async () => {
	return await axios({
		method: 'get',
		url,
	});
};
