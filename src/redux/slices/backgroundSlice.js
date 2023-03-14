import { createSlice } from "@reduxjs/toolkit";
import { useLocalStorage } from "../../hooks";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { getStorage, setStorage } = useLocalStorage();

const initialState = {
	idActive: getStorage("background") || 0,
};

const backgroundSlice = createSlice({
	name: "background",
	initialState,
	reducers: {
		setIdActive: (state, action) => {
			state.idActive = action.payload;
			setStorage("background", action.payload);
		},
	},
});

const { actions, reducer } = backgroundSlice;

export const { setIdActive } = actions;
export default reducer;
