import { type DialogType } from '$lib/types/global.d';
import { dj2b, Events, type Callback } from '$lib/scripts/utils';

function cdialog_stack() {
	let store = $state<Record<string, DialogType>>({});
	let stack = $state<string[]>([]);
	let events = new Events();
	return {
		subscribe: (type: string, callback: Callback) => events.add(type, callback),
		dispatch: (type: string, ...args: any[]) => events.dispatch(type, args),
		push: (d: DialogType) => {
			d.id = dj2b(Math.random().toString());
			store[d.id] = d;
			stack.unshift(d.id);
			return d.id;
		},
		pop: () => {
			let id = stack.shift();
			if (id) {
				let obj = store[id];
				delete store[id];
				return obj;
			}
		},
		popv: (d: DialogType | string) => {
			let id = '';
			if (typeof d == 'object') d = d.id;
			if (typeof d == 'string') {
				stack = stack.filter((e) => {
					if (e == d) {
						id = e;
						return false;
					}
					return true;
				});
			}
			let obj = store[id];
			delete store[id];
			return obj;
		}
	};
}

export const dialog_stack = cdialog_stack();
