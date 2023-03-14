import { createSlice } from "@reduxjs/toolkit";
import { useLocalStorage } from "../../hooks";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { getStorage, setStorage } = useLocalStorage();

const initialState = {
	allSongs: [],
	hideList: getStorage("hide-list") || [],
};

const songSlice = createSlice({
	name: "song",
	initialState,
	reducers: {
		setAllSongs: (state, action) => {
			state.allSongs = action.payload;
		},
		setHideList: (state, action) => {
			state.hideList = action.payload;
			setStorage("hide-list", action.payload);
		},
	},
});

const { actions, reducer } = songSlice;

export const { setAllSongs, setHideList } = actions;
export default reducer;
