import { useState, useLayoutEffect } from "react";

function useDebounce(value, delay = 800) {
	const [newValue, setNewValue] = useState(value);

	useLayoutEffect(() => {
		const timeout = setTimeout(() => {
			setNewValue(value);
		}, delay);

		return () => {
			clearTimeout(timeout);
		};
	}, [value, delay]);

	return newValue;
}

export default useDebounce;
