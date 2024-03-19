import backgrounds from "./backgrounds";
import settings from "./settings";
import timerLine from "./timerLine";
import playList from "./playList";

const configs = {
	backgrounds,
	settings,
	timerLine,
	playList,
	apiBaseUrl: process.env.REACT_APP_API_BASE_URL,
};

export default configs;
