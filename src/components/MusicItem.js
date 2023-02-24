import { useEffect, useRef, useContext } from "react";
import { AudioContextKey } from "../contexts/AudioContext";
import Lottie from "react-lottie";
import * as waveAnimate from "../assets/effects/wave.json";

function MusicItem({ index, currentIndex, song, handleClick }) {
	const { playingState } = useContext(AudioContextKey);
	const [isPlaying] = playingState;

	const itemRef = useRef();

	const isActive = index === currentIndex;

	useEffect(() => {
		if (isActive) {
			itemRef.current.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	}, [isActive]);

	return (
		<div
			ref={itemRef}
			className={`flex items-center relative p-[8px] mb-[12px] bg-[rgba(255,255,255,0.4)] rounded-[4px] cursor-pointer overflow-hidden hover:bg-[rgba(255,255,255,0.8)]
						${isActive && "bg-[rgba(255,255,255,0.8)]"}
					`}
			onClick={handleClick}
		>
			<img src={song.imageURL} alt="" className="w-[50px] h-[50px] rounded-full" />
			<div className="ml-[12px]">
				<h3 className="font-[700] text-[15px]">{song.name}</h3>
				<p className="text-[13px]">{song.singer}</p>
			</div>

			{isActive && isPlaying && (
				<div className="absolute right-0 inset-y-[-12px]">
					<Lottie options={{ animationData: waveAnimate }} />
				</div>
			)}
		</div>
	);
}

export default MusicItem;
