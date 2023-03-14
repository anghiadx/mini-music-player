import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isPlaying: false,
};

const audioSlice = createSlice({
	name: "audio",
	initialState,
	reducers: {
		setIsPlaying: (state, action) => {
			state.isPlaying = action.payload;
		},
	},
});

const { actions, reducer } = audioSlice;

export const { setIsPlaying } = actions;
export default reducer;
