import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Lottie from "lottie-react";

import * as hourglassAnimate from "../../../../assets/effects/hourglass-animation.json";
import { changeIsRunning, changeExpiryTime } from "../../../../redux/slices/timerSlice";
import Container from "./Container";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import configs from "../../../../configs";

function Timer() {
	// Get data from configs
	const { minTime, maxTime, step } = configs.timerLine;

	// Redux
	const dispatch = useDispatch();
	const { isRunning, expiryTime } = useSelector((state) => state.timer);

	// State
	const [time, setTime] = useState(expiryTime === 1 ? 0 : expiryTime);

	const timePercent = (time / maxTime) * 100;
	const validTime = time || 1;

	const setIsRunning = (isRunning) => {
		const action = changeIsRunning(isRunning);
		dispatch(action);
	};

	const handleChangeExpiryTime = () => {
		const action = changeExpiryTime(validTime);
		dispatch(action);
	};

	return (
		<Container title="Hẹn giờ tắt nhạc" switchState={[isRunning, setIsRunning]}>
			{isRunning ? (
				<div className="animate-scale-in">
					<div className="animate-pulse mb-[12px]">
						<div className="w-[94px] mx-auto">
							<Lottie animationData={hourglassAnimate} />
						</div>
						<p className="mt-[8px] font-bold text-center text-[brown]">Hẹn giờ đang chạy!</p>
					</div>
				</div>
			) : (
				<div className="mb-[4px]">
					<p className="pb-[8px]">
						Bạn có thể hẹn giờ và hệ thống sẽ tự động dừng phát nhạc sau khoảng thời gian bạn yêu cầu! Đặt
						thời gian mà bạn muốn:
					</p>
					<div className="w-full max-w-[400px] my-[28px] mx-auto pt-[8px]">
						{/* Slider time */}
						<div className="timer-line mx-[12px] h-[2px] bg-[#ccc]">
							{/* Slider time bar */}
							<div className="absolute inset-y-0 left-0 bg-black" style={{ width: `${timePercent}%` }}>
								<span
									className="absolute top-1/2 right-0 text-[18px] rounded-full bg-white"
									style={{ transform: `translate(50%, -50%)` }}
								>
									<FontAwesomeIcon icon={faClock} />
									<span className="absolute left-[50%] top-0 translate-y-[calc(-100%-4px)] translate-x-[-50%] text-[13px]">
										{validTime + "'"}
									</span>
								</span>
							</div>
							<input
								type="range"
								min={minTime - 1}
								max={maxTime}
								step={step}
								className="block w-[calc(100%+17px)] ml-[-8px] translate-y-[-50%] opacity-0 cursor-pointer"
								onChange={(e) => {
									const value = +e.target.value;
									setTime(value);
								}}
								onMouseUp={handleChangeExpiryTime}
								onTouchEnd={handleChangeExpiryTime}
							/>
						</div>

						{/* Time number */}
						<div className="flex justify-between mt-[12px] mx-[6px] text-[13px]">
							<span>{minTime < 10 ? `0${minTime}` : minTime}</span>
							<span>{maxTime < 10 ? `0${maxTime}` : maxTime}</span>
						</div>
					</div>

					<p className="italic font-bold">
						Tự động dừng phát sau: <span className="text-[brown]">{validTime}</span> phút
					</p>
				</div>
			)}
		</Container>
	);
}

export default Timer;
