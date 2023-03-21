import { useState, memo, useMemo, useRef, useEffect } from "react";
import Lottie from "lottie-react";
import * as loadingAnimate from "../../../assets/effects/loading-animation.json";
import MusicItem from "./MusicItem";

function MusicList({ filteredSongs, currentIndex, setCurrentIndex }) {
	const [page, setPage] = useState(0);
	const songOfPage = 15;

	const currentList = useMemo(() => filteredSongs.slice(0, songOfPage * page), [filteredSongs, page]);

	const loadMoreRef = useRef();
	const songListRef = useRef();

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setPage((prevPage) => {
						const nextSongIndex = songOfPage * prevPage;
						if (filteredSongs[nextSongIndex]) {
							return prevPage + 1;
						}

						return prevPage;
					});
				}
			},
			{ root: songListRef.current, threshold: 0.9 }
		);

		observer.observe(loadMoreRef.current);

		return () => {
			observer.disconnect();
		};
	}, [filteredSongs]);

	return (
		<div ref={songListRef} className="grow relative min-[466px]:h-[320px] mt-[8px] mr-[-4px] overflow-y-auto">
			{/* Show animation when loading */}
			{!filteredSongs.length ? (
				<span className="absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] w-[124px] pointer-events-none">
					<Lottie animationData={loadingAnimate} />
				</span>
			) : (
				<div>
					{currentList.map((song, index) => {
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
			<div ref={loadMoreRef} className="h-[4px]"></div>
		</div>
	);
}

export default memo(MusicList);
