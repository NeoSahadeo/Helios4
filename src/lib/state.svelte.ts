function create_state<T>(iv: T) {
	let state = $state<T>(iv);
	return {
		get: () => state,
		set: (value: T) => (state = value)
	};
}

export const loading_state = create_state(false);
export const mobile_state = create_state(false);
