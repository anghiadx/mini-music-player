import { memo, useRef, useEffect } from "react";
import Lottie from "lottie-react";
import * as loadingAnimate from "../../../assets/effects/loading-animation.json";
import MusicItem from "./MusicItem";

function MusicList({ data, currentIndex, setCurrentIndex, setPage }) {
	const loadMoreRef = useRef();
	const songListRef = useRef();

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setPage((prevPage) => prevPage + 1);
				}
			},
			{ root: songListRef.current, threshold: 0.9 }
		);

		observer.observe(loadMoreRef.current);

		return () => {
			observer.disconnect();
		};
	}, [setPage]);

	return (
		<div ref={songListRef} className="grow relative min-[466px]:h-[320px] mt-[8px] mr-[-4px] overflow-y-auto">
			{/* Show animation when loading */}
			{!data.length ? (
				<span className="absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] w-[124px] pointer-events-none">
					<Lottie animationData={loadingAnimate} />
				</span>
			) : (
				<div>
					{data.map((song, index) => {
						return (
							<MusicItem
								key={index}
								index={index}
								currentIndex={currentIndex}
								song={song}
								handleClick={() => {
									setCurrentIndex(index);
								}}
							/>
						);
					})}
				</div>
			)}
			{/* Loadmore element */}
			<div ref={loadMoreRef} className="h-[4px]"></div>
		</div>
	);
}

export default memo(MusicList);
