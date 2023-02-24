import { useState, useEffect, useContext, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faForward, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { AudioContextKey } from "../contexts/AudioContext";

function MusicControl({ songLength, currentSong, audio, setIndex }) {
	const { playingState } = useContext(AudioContextKey);

	const [isPlaying, setIsPlaying] = playingState;
	const [isLoop] = useState(false);

	if (currentSong) {
		isPlaying ? audio.play() : audio.pause();
	}

	useEffect(() => {
		const handleEnded = () => {
			isLoop ? audio.play() : handleNextSong();
		};

		audio.addEventListener("ended", handleEnded);
		return () => {
			audio.removeEventListener("ended", handleEnded);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isLoop, audio, songLength]);

	const handlePrevSong = () => {
		setIndex((prev) => {
			const prevIndex = prev - 1;
			return prevIndex < 0 ? songLength - 1 : prevIndex;
		});
	};

	const handleNextSong = () => {
		setIndex((prev) => {
			const nextIndex = prev + 1;
			return nextIndex > songLength - 1 ? 0 : nextIndex;
		});
	};

	return (
		<div className="flex justify-between max-w-[70%] mx-auto mt-[-8px] mb-[12px]">
			<button
				className="flex justify-center items-center w-[45px] h-[45px] pr-[5px] rounded-full text-[25px] hover:bg-[#ddd] transition-colors duration-150"
				onClick={currentSong && handlePrevSong}
			>
				<FontAwesomeIcon icon={faBackward} />
			</button>
			<button
				className="flex justify-center items-center w-[45px] h-[45px] rounded-full text-[25px] hover:bg-[#ddd] transition-colors duration-150"
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
				className="flex justify-center items-center w-[45px] h-[45px] pl-[5px] rounded-full text-[25px] hover:bg-[#ddd] transition-colors duration-150"
				onClick={currentSong && handleNextSong}
			>
				<FontAwesomeIcon icon={faForward} />
			</button>
		</div>
	);
}

export default memo(MusicControl);
