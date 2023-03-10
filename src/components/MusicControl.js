import { useState, useEffect, useRef, useContext, memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRandom, faRepeat } from "@fortawesome/free-solid-svg-icons";
import Lottie from "lottie-react";
import * as playAnimation from "../assets/effects/play-animation.json";
import * as prevAnimation from "../assets/effects/prev-animation.json";
import * as nextAnimation from "../assets/effects/next-animation.json";
import { AudioContextKey } from "../contexts/AudioContext";
import { useLocalStorage } from "../hooks";

function MusicControl({ songLength, currentSong, audio, setIndex }) {
	const { playingState } = useContext(AudioContextKey);
	const { getStorage, setStorage } = useLocalStorage();

	const [isPlaying, setIsPlaying] = playingState;
	const [isLoop, setIsLoop] = useState(getStorage("isLoop") || false);
	const [isRandom, setIsRandom] = useState(getStorage("isRandom") || false);

	// Ref
	const playBtnRef = useRef();
	const prevBtnRef = useRef();
	const nextBtnRef = useRef();

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
			if (!isEnded && isPlaying) {
				setIsPlaying(false);
				changePlayAnimation(false);
			}
		};
		const handlePlay = () => {
			if (!isPlaying) {
				setIsPlaying(true);
				changePlayAnimation(true);
			}
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

	// Set default animation speed
	useEffect(() => {
		playBtnRef.current.setSpeed(2);
		prevBtnRef.current.setSpeed(1.5);
		nextBtnRef.current.setSpeed(1.5);
	}, []);

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

	const changePlayAnimation = (isPlaying) => {
		const segment = isPlaying ? [0, 33] : [33, 67];
		playBtnRef.current.playSegments(segment, true);
	};

	return (
		<div className="flex justify-between max-w-[70%] mx-auto mt-[-8px] mb-[12px]">
			{/* Prev btn */}
			<button
				className="flex justify-center items-center w-[50px] h-[50px] rounded-full text-[25px] hover:bg-[#2db8ff33] transition-colors duration-150"
				onClick={() => {
					if (currentSong) {
						handlePrevSong();
						prevBtnRef.current.goToAndPlay(5, true);
					}
				}}
			>
				<Lottie lottieRef={prevBtnRef} animationData={prevAnimation} autoplay={false} loop={false} />
			</button>

			{/* Play / Pause btn */}
			<button
				className="flex justify-center items-center w-[50px] h-[50px] rounded-full text-[25px] hover:bg-[#2db8ff33] transition-colors duration-150"
				onClick={() => {
					if (currentSong) {
						setIsPlaying(!isPlaying);
						changePlayAnimation(!isPlaying);
					}
				}}
			>
				<Lottie lottieRef={playBtnRef} animationData={playAnimation} autoplay={false} loop={false} />
			</button>

			{/* Next btn */}
			<button
				className="flex justify-center items-center w-[50px] h-[50px] rounded-full text-[25px] hover:bg-[#2db8ff33] transition-colors duration-150"
				onClick={() => {
					if (currentSong) {
						handleNextSong();
						nextBtnRef.current.goToAndPlay(5, true);
					}
				}}
			>
				<Lottie lottieRef={nextBtnRef} animationData={nextAnimation} autoplay={false} loop={false} />
			</button>

			{/* Repeat and Random btn */}
			<div className="absolute top-0 right-[-6px] flex flex-col justify-around h-[80px] text-[#777]">
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
