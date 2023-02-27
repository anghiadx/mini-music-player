const storageKey = "MINI_MUSIC_PLAYER_KEY";

function useLocalStorage() {
	const getDataStorage = () => {
		const dataStr = localStorage.getItem(storageKey) || "{}";
		return JSON.parse(dataStr);
	};

	const getStorage = (key) => {
		const dataStorage = getDataStorage();
		return dataStorage[key];
	};

	const setStorage = (key, value) => {
		const dataStorage = getDataStorage();
		dataStorage[key] = value;

		const dataJSON = JSON.stringify(dataStorage);
		localStorage.setItem(storageKey, dataJSON);
	};

	return {
		getStorage,
		setStorage,
	};
}

export default useLocalStorage;
