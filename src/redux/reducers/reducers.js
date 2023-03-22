import { combineReducers } from "@reduxjs/toolkit";
import audioReducer from "../slices/audioSlice";
import backgroundReducer from "../slices/backgroundSlice";
import songReducer from "../slices/songSlice";
import timerReducer from "../slices/timerSlice";
import playListReducer from "../slices/playListSlice";

const rootReducer = combineReducers({
	audio: audioReducer,
	background: backgroundReducer,
	song: songReducer,
	timer: timerReducer,
	playList: playListReducer,
});

export default rootReducer;
