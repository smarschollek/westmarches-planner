import getConfig from 'next/config';
import { userService } from '../services/user-service';

const { publicRuntimeConfig } = getConfig();

const get = async <T>(url: string) : Promise<T> => {
	const requestOptions: RequestInit = {
		method: 'GET',
		headers: authHeader(url)
	};

	return await fetch(url, requestOptions).then<T>(handleResponse);
};

const post = async <T>(url: string, body: T ) => {
	const requestOptions = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json', ...authHeader(url) },
		body: JSON.stringify(body)
	};
	return await fetch(url, requestOptions).then(handleResponse);
};

const put = async <T>(url: string, body: T ) => {
	const requestOptions = {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json', ...authHeader(url) },
		body: JSON.stringify(body)
	};
	return await fetch(url, requestOptions).then(handleResponse);
};

const _delete = async (url: string) => {
	const requestOptions = {
		method: 'DELETE',
		headers: authHeader(url)
	};
	return await fetch(url, requestOptions).then(handleResponse);
};

const authHeader = (url: string) : {} => {
	const token = userService.token;
	const isLoggedIn = !!token;
	const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
	if (isLoggedIn && isApiUrl) {
		return { Authorization: `Bearer ${token}` };
	} else {
		return {};
	}
};

const handleResponse = async <T>(response : Response): Promise<T> => {
	const text = await response.text();
	
	const data = text && JSON.parse(text);

	if (!response.ok) {
		if ([401, 403].includes(response.status) && userService.token) {
			userService.logout();
		}

		//some kind of error logging	
	}

	return data;
};

export const fetchWrapper = {
	get,
	post,
	put,
	delete: _delete
};