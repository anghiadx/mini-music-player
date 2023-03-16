import { useEffect, useRef } from "react";
import Lottie from "lottie-react";
import { useSelector } from "react-redux";

import * as waveAnimate from "../../assets/effects/song-wave.json";
import * as cdAnimate from "../../assets/effects/cd-animation.json";

function MusicItem({ index, currentIndex, song, handleClick }) {
	const { isPlaying } = useSelector((state) => state.audio);

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
			className={`flex items-center relative p-[8px] mb-[12px] mr-[3px] bg-[rgba(255,255,255,0.4)] rounded-[4px] cursor-pointer 
						overflow-hidden transition-colors duration-500 hover:bg-[rgba(255,255,255,0.8)]
						${isActive && "bg-[rgba(255,255,255,0.8)]"}
					`}
			onClick={handleClick}
		>
			<div
				className="shrink-0 flex items-center justify-center w-[50px] h-[50px] rounded-full overflow-hidden bg-cover bg-center"
				style={{ backgroundImage: `url('${song.imageURL}')` }}
			>
				{isActive && isPlaying && <Lottie animationData={cdAnimate} />}
			</div>
			<div className="grow ml-[12px] mr-[44px]">
				<h3 className="font-[700] text-[15px] line-clamp-1">{song.name}</h3>
				<p className="text-[13px] line-clamp-1">{song.singer}</p>
			</div>

			{isActive && isPlaying && (
				<div className="flex items-center w-[200px] absolute right-[-70px] pointer-events-none">
					<Lottie animationData={waveAnimate} />
				</div>
			)}
		</div>
	);
}

export default MusicItem;
