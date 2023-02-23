import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faForward, faPause, faPlay } from "@fortawesome/free-solid-svg-icons";

function MusicControl({ songLength, currentSong, audio, setIndex }) {
	const [playing, setPlaying] = useState(false);
	const [loop] = useState(false);

	if (currentSong) {
		playing ? audio.play() : audio.pause();
	}

	useEffect(() => {
		const handleEnded = () => {
			loop ? audio.play() : handleNextSong();
		};

		audio.addEventListener("ended", handleEnded);
		return () => {
			audio.removeEventListener("ended", handleEnded);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loop, audio]);

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
				className="flex justify-center items-center w-[45px] h-[45px] pr-[5px] rounded-full text-[25px] hover:bg-[#ddd] transition-colors duration-300"
				onClick={currentSong && handlePrevSong}
			>
				<FontAwesomeIcon icon={faBackward} />
			</button>
			<button
				className="flex justify-center items-center w-[45px] h-[45px] rounded-full text-[25px] hover:bg-[#ddd] transition-colors duration-300"
				onClick={() => {
					currentSong && setPlaying(!playing);
				}}
			>
				{playing ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon className="pl-[5px]" icon={faPlay} />}
			</button>
			<button
				className="flex justify-center items-center w-[45px] h-[45px] pl-[5px] rounded-full text-[25px] hover:bg-[#ddd] transition-colors duration-300"
				onClick={currentSong && handleNextSong}
			>
				<FontAwesomeIcon icon={faForward} />
			</button>
		</div>
	);
}

export default MusicControl;
