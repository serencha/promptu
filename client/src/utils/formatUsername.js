export const formatUsername = (username) => {
	return '@' + username.split('_').join('');
};
