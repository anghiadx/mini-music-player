import { useSelector, useDispatch } from "react-redux";
import { changeIsRunning } from "../../../redux/slices/timerSlice";
import { setIsPlaying } from "../../../redux/slices/audioSlice";
import MusicTimerUI from "./MusicTimerUI";

function MusicTimer() {
	// Redux
	const dispatch = useDispatch();
	const { isRunning, expiryTime } = useSelector((state) => state.timer);

	// expireTimestamp needs to receive a value of milliseconds,
	// the unit of ExpirationTime is currently minutes,
	// so we have to multiply by 60000 to get the corresponding number of milliseconds
	const expiryTimestamp = Date.now() + expiryTime * 60000;

	const handleExpire = () => {
		dispatch(changeIsRunning(false));
		dispatch(setIsPlaying(false));
	};

	return isRunning && <MusicTimerUI expiryTimestamp={expiryTimestamp} onExpire={handleExpire} />;
}

export default MusicTimer;
