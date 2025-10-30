import { type PasswordObject } from '$lib/types/global.d';

export function parse_csv(csv_text: string): PasswordObject[] {
	const lines = csv_text.split('\n');
	const header = lines.shift()?.split(',');
	if (!header) throw new Error('CSV Missing Header');

	const csv_data: PasswordObject[] = [];
	lines.forEach((e) => {
		const obj: any = {};
		const data = e.split(',');
		for (let x = 0; x < header?.length; x++) {
			obj[header[x]] = data[x];
		}
		csv_data.push(obj);
	});

	return csv_data;
}

export function dj2b(str: string): string {
	let hash = 5381;
	for (let x = 0; x < str.length; x++) hash = (hash << 5) + hash + str.charCodeAt(x);
	return hash.toString();
}

export type Callback = (...args: any[]) => any;

export class Events {
	private events: Record<string, Callback[]>;
	constructor() {
		this.events = {};
	}
	add(name: string, callback: () => void) {
		if (this.events[name]) this.events[name].push(callback);
		else this.events[name] = [callback];
	}
	remove(name: string, callback: () => void) {
		if (this.events[name]) this.events[name].filter((e) => e != callback);
	}
	dispatch(name: string, ...args: any[]) {
		if (this.events[name]) this.events[name].forEach((e) => e(args));
	}
}
