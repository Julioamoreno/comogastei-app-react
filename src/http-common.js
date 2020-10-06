import axios from 'axios';

export default axios.create({
	//url da api
	baseURL: process.env.REACT_APP_BASE_URL_API,
	headers: {
		'Content-type': 'application/json',
	},
});
