export interface PasswordObject {
	created: string;
	email: string;
	id: number;
	nickname: string;
	notes: string;
	password: string;
	site_name: string;
	site_url: string;
	username: string;
}

export type DialogType = {
	id?: string;
	message: string;
	confirm?: string;
	reject?: string;
	callbackconfirm?: (...any) => any | Promise<any>;
	callbackreject?: (...any) => any | Promise<any>;
};
