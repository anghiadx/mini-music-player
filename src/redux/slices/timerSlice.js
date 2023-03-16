import { createSlice } from "@reduxjs/toolkit";
import { useLocalStorage } from "../../hooks";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { getStorage, setStorage } = useLocalStorage();

const initialState = {
	isRunning: false,
	expiryTime: getStorage("expiry-time") || 15, // minutes
};

const timerSlice = createSlice({
	name: "timer",
	initialState,
	reducers: {
		changeIsRunning: (state, action) => {
			state.isRunning = action.payload;
		},
		changeExpiryTime: (state, action) => {
			state.expiryTime = action.payload;
			setStorage("expiry-time", action.payload);
		},
	},
});

const { actions, reducer } = timerSlice;

export const { changeIsRunning, changeExpiryTime } = actions;
export default reducer;
