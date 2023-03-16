import { useState, useEffect, useCallback } from "react";
import { timeToPercent, percentToTime, timeFormat } from "../../funcHandler";

function MusicTimeControl({ audio, currentSong }) {
	const [currentTime, setCurrentTime] = useState(0);
	const [totalTime, setTotalTime] = useState(0);
	const [percent, setPercent] = useState(0);

	const handleTimeUpdate = useCallback(
		function () {
			const currentTime = this.currentTime;
			const percent = timeToPercent(currentTime, totalTime);

			setCurrentTime(currentTime);
			setPercent(percent);
		},
		[totalTime]
	);

	useEffect(() => {
		function handleLoadedData(e) {
			setTotalTime(this.duration);
		}
		audio.addEventListener("loadeddata", handleLoadedData);

		return () => {
			audio.removeEventListener("loadeddata", handleLoadedData);
		};
	}, [currentSong, audio]);

	useEffect(() => {
		audio.addEventListener("timeupdate", handleTimeUpdate);

		return () => {
			audio.removeEventListener("timeupdate", handleTimeUpdate);
		};
	}, [audio, handleTimeUpdate]);

	// Function handle
	const handleMouseDown = (e) => {
		// Cancel action when there is no current song
		if (!currentSong) {
			return;
		}
		audio.removeEventListener("timeupdate", handleTimeUpdate);
	};

	const handleMouseUp = (e) => {
		// Cancel action when there is no current song
		if (!currentSong) {
			return;
		}

		const percent = parseInt(e.target.value);
		const currentTime = percentToTime(percent, totalTime);

		audio.currentTime = currentTime;
		audio.addEventListener("timeupdate", handleTimeUpdate);
	};

	return (
		<div className="mt-[32px]">
			<div className="relative h-[3px] bg-[#dedede]">
				<div className="relative h-full w-[30%] bg-black" style={{ width: `${percent}%` }}>
					<div
						className="
                            absolute top-1/2 right-0
                            after:content-[''] after:block after:w-[12px] after:h-[12px] 
                            after:rounded-full after:translate-x-full after:translate-y-[-50%] after:bg-black
                        "
						style={{ transform: `translateX(${-percent}%)` }}
					></div>
				</div>
				<input
					type="range"
					min="0"
					max="100"
					step="1"
					className="absolute inset-x-0 top-0 mx-[-2px] opacity-0 translate-y-[-50%] cursor-pointer"
					onChange={(e) => {
						if (!currentSong) {
							return;
						}

						const percent = parseInt(e.target.value);
						const currentTime = percentToTime(percent, totalTime);

						setPercent(percent);
						setCurrentTime(currentTime);
					}}
					onMouseDown={handleMouseDown}
					onMouseUp={handleMouseUp}
					onTouchStart={handleMouseDown}
					onTouchEnd={handleMouseUp}
				/>
			</div>
			{/* Show time */}
			<p className="flex justify-between mt-[8px] text-[15px]">
				<span>{timeFormat(currentTime)}</span>
				<span>{timeFormat(totalTime)}</span>
			</p>
		</div>
	);
}

export default MusicTimeControl;
