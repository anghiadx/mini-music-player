import { createSlice } from "@reduxjs/toolkit";
import { useLocalStorage } from "../../hooks";

// eslint-disable-next-line react-hooks/rules-of-hooks
const { getStorage, setStorage } = useLocalStorage();

const initialState = {
	hideList: getStorage("hide-list") || [],
};

const songSlice = createSlice({
	name: "song",
	initialState,
	reducers: {
		setHideList: (state, action) => {
			const hideList = action.payload;
			state.hideList = hideList;
			setStorage("hide-list", hideList);
		},
	},
});

const { actions, reducer } = songSlice;

export const { setHideList } = actions;
export default reducer;
