import http from '../http-common';

const get = async period => {
	return await http.get(`/api/transaction?period=${period}`);
};

const create = async data => {
	return await http.post('/api/transaction/', data);
};

const update = async (id, data) => {
	return await http.put(`/api/transaction/${id}`, data);
};

const remove = async id => {
	return await http.delete(`/api/transaction/${id}`);
};

export default {
	get,
	create,
	update,
	remove,
};
