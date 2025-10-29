import { resolve } from '$app/paths';
import { parse_csv } from './utils';

export async function login(): Promise<boolean> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, 1000);
	});
}

export async function logout(): Promise<boolean> {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve(true);
		}, 1000);
	});
}

export async function fetch_passwords(page = 0): Promise<any> {
	return new Promise(async (_resolve) => {
		const res = await fetch(resolve('/dev/api/fetchpassword'), {
			method: 'GET'
		});
		if (res.ok) {
			const data = parse_csv(await res.text());
			_resolve(data);
		}
	});
}
