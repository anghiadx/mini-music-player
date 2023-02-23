import { useEffect, useRef } from "react";

function MusicItem({ index, currentIndex, song, handleClick }) {
	const itemRef = useRef();
	useEffect(() => {
		if (index === currentIndex) {
			itemRef.current.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	}, [index, currentIndex]);

	return (
		<div
			ref={itemRef}
			className={`flex items-center p-[8px] mb-[12px] bg-[rgba(255,255,255,0.4)] rounded-[4px] cursor-pointer hover:bg-[rgba(255,255,255,0.8)]
						${currentIndex === index && "bg-[rgba(255,255,255,0.8)]"}
					`}
			onClick={handleClick}
		>
			<img src={song.imageURL} alt="" className="w-[50px] h-[50px] rounded-full" />
			<div className="ml-[12px]">
				<h3 className="font-[700] text-[15px]">{song.name}</h3>
				<p className="text-[13px]">{song.singer}</p>
			</div>
		</div>
	);
}

export default MusicItem;
