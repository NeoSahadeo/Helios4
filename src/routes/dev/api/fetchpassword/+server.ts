import fs from 'fs';
import path from 'path';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async () => {
	const filePath = path.resolve('data.csv'); // adjust path as needed
	const data = fs.readFileSync(filePath, 'utf-8');
	return new Response(data);
};
