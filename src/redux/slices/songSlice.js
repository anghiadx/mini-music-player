import { createSlice } from "@reduxjs/toolkit";
import { useLocalStorage } from "../../hooks";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { getStorage, setStorage } = useLocalStorage();

const initialState = {
	allSongs: [],
	hideList: getStorage("hide-list") || [],
	filteredSongs: [],
};

const songSlice = createSlice({
	name: "song",
	initialState,
	reducers: {
		setAllSongs: (state, action) => {
			const allSongs = action.payload;
			state.allSongs = allSongs;

			// filter list
			state.filteredSongs = allSongs.filter((song) => {
				return !state.hideList.includes(+song.id);
			});
		},
		setHideList: (state, action) => {
			const hideList = action.payload;
			state.hideList = hideList;
			setStorage("hide-list", hideList);

			// filter list
			state.filteredSongs = state.allSongs.filter((song) => {
				return !hideList.includes(+song.id);
			});
		},
	},
});

const { actions, reducer } = songSlice;

export const { setAllSongs, setHideList } = actions;
export default reducer;
