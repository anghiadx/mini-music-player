import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentList: [],
};

const playListSlice = createSlice({
	name: "play-list",
	initialState,
	reducers: {
		updateCurrentList: (state, action) => {
			state.currentList = action.payload;
		},
	},
});

const { actions, reducer } = playListSlice;

export const { updateCurrentList } = actions;
export default reducer;
