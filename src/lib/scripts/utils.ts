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
