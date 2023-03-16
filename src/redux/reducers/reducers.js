import { combineReducers } from "@reduxjs/toolkit";
import audioReducer from "../slices/audioSlice";
import backgroundReducer from "../slices/backgroundSlice";
import songReducer from "../slices/songSlice";
import timerReducer from "../slices/timerSlice";

const rootReducer = combineReducers({
	audio: audioReducer,
	background: backgroundReducer,
	song: songReducer,
	timer: timerReducer,
});

export default rootReducer;
