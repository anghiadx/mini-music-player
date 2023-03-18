import { useTimer } from "react-timer-hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-regular-svg-icons";

function MusicTimerUi({ expiryTimestamp, onExpire }) {
	const { seconds, minutes, isRunning } = useTimer({
		expiryTimestamp,
		autoStart: true,
	});

	return (
		<div
			className={`flex items-end mt-[-2px] text-[#444] ${!isRunning && "animate-scale-out"}`}
			onAnimationEnd={onExpire}
		>
			<span className="text-[18px]">
				<FontAwesomeIcon icon={faClock} />
			</span>
			<div className="ml-[4px] pb-[3px] text-[13px] font-[600]">
				<span>{minutes < 10 ? `0${minutes}` : minutes}</span>:
				<span>{seconds < 10 ? `0${seconds}` : seconds}</span>
			</div>
		</div>
	);
}

export default MusicTimerUi;
