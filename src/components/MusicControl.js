import { useState, useEffect, useContext, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faForward, faPause, faPlay, faRandom, faRepeat } from "@fortawesome/free-solid-svg-icons";
import { AudioContextKey } from "../contexts/AudioContext";
import { useLocalStorage } from "../hooks";

function MusicControl({ songLength, currentSong, audio, setIndex }) {
	const { playingState } = useContext(AudioContextKey);
	const { getStorage, setStorage } = useLocalStorage();

	const [isPlaying, setIsPlaying] = playingState;
	const [isLoop, setIsLoop] = useState(getStorage("isLoop") || false);
	const [isRandom, setIsRandom] = useState(getStorage("isRandom") || false);

	// Handle Play / Pause audio by state
	useEffect(() => {
		if (currentSong) {
			isPlaying ? audio.play() : audio.pause();
		}
	}, [isPlaying, audio, currentSong]);

	// Handle audio pause / play event
	useEffect(() => {
		const handlePause = () => {
			const isEnded = audio.currentTime === audio.duration;
			!isEnded && setIsPlaying(false);
		};
		const handlePlay = () => {
			!isPlaying && setIsPlaying(true);
		};
		audio.addEventListener("pause", handlePause);
		audio.addEventListener("play", handlePlay);

		return () => {
			audio.removeEventListener("pause", handlePause);
			audio.removeEventListener("play", handlePlay);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isPlaying]);

	// Handle audio ended event
	useEffect(() => {
		const handleEnded = () => {
			isLoop ? audio.play() : handleNextSong();
		};

		audio.addEventListener("ended", handleEnded);
		return () => {
			audio.removeEventListener("ended", handleEnded);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoop, isRandom, audio, songLength]);

	const handleRandomSong = () => {
		setIndex((prev) => {
			let randomIndex;
			do {
				randomIndex = Math.floor(Math.random() * songLength);
			} while (randomIndex === prev);

			return randomIndex;
		});
	};

	const handlePrevSong = () => {
		if (isRandom) {
			handleRandomSong();
			return;
		}

		setIndex((prev) => {
			const prevIndex = prev - 1;
			return prevIndex < 0 ? songLength - 1 : prevIndex;
		});
	};

	const handleNextSong = () => {
		if (isRandom) {
			handleRandomSong();
			return;
		}

		setIndex((prev) => {
			const nextIndex = prev + 1;
			return nextIndex > songLength - 1 ? 0 : nextIndex;
		});
	};

	return (
		<div className="flex justify-between max-w-[70%] mx-auto mt-[-8px] mb-[12px]">
			<button
				className="flex justify-center items-center w-[45px] h-[45px] pr-[5px] rounded-full text-[25px] hover:bg-[#2db8ff33] transition-colors duration-150"
				onClick={currentSong && handlePrevSong}
			>
				<FontAwesomeIcon icon={faBackward} />
			</button>
			<button
				className="flex justify-center items-center w-[45px] h-[45px] rounded-full text-[25px] hover:bg-[#2db8ff33] transition-colors duration-150"
				onClick={() => {
					currentSong && setIsPlaying(!isPlaying);
				}}
			>
				{isPlaying ? (
					<FontAwesomeIcon icon={faPause} />
				) : (
					<FontAwesomeIcon className="pl-[5px]" icon={faPlay} />
				)}
			</button>
			<button
				className="flex justify-center items-center w-[45px] h-[45px] pl-[5px] rounded-full text-[25px] hover:bg-[#2db8ff33] transition-colors duration-150"
				onClick={currentSong && handleNextSong}
			>
				<FontAwesomeIcon icon={faForward} />
			</button>

			{/* Repeat and Random btn */}
			<div className="absolute top-[16px] right-[12px] min-[466px]:top-[24px] min-[466px]:right-[20px] flex flex-col justify-around h-[80px] text-[#777]">
				<button
					className={`p-[6px] text-[18px] ${isLoop && "text-black"}`}
					onClick={() => {
						setIsLoop(!isLoop);
						setStorage("isLoop", !isLoop);
					}}
				>
					<FontAwesomeIcon icon={faRepeat} />
				</button>

				<button
					className={`p-[4px] text-[18px] ${isRandom && "text-black"}`}
					onClick={() => {
						setIsRandom(!isRandom);
						setStorage("isRandom", !isRandom);
					}}
				>
					<FontAwesomeIcon icon={faRandom} />
				</button>
			</div>
		</div>
	);
}

export default memo(MusicControl);
