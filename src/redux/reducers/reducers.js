import { combineReducers } from "@reduxjs/toolkit";
import audioReducer from "../slices/audioSlice";
import backgroundReducer from "../slices/backgroundSlice";
import songReducer from "../slices/songSlice";

const rootReducer = combineReducers({
	audio: audioReducer,
	background: backgroundReducer,
	song: songReducer,
});

export default rootReducer;
