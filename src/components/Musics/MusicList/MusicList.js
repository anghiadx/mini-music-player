import { useState, memo, useMemo, useRef, useEffect } from "react";
import Lottie from "lottie-react";
import { useDispatch, useSelector } from "react-redux";

import { updateCurrentList } from "../../../redux/slices/playListSlice";
import * as loadingAnimate from "../../../assets/effects/loading-animation.json";
import MusicItem from "./MusicItem";

function MusicList({ currentIndex, setCurrentIndex }) {
	const [page, setPage] = useState(0);
	const songOfPage = 15;

	// Redux
	const dispatch = useDispatch();
	const { filteredSongs } = useSelector((state) => state.song);

	const currentList = useMemo(() => {
		const currentList = filteredSongs.slice(0, songOfPage * page);

		return currentList;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filteredSongs, page]);

	const loadMoreRef = useRef();
	const songListRef = useRef();

	useEffect(() => {
		// Update currentList store
		currentList.length && dispatch(updateCurrentList(currentList));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentList]);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					const nextSong = filteredSongs[songOfPage * page];
					nextSong && setPage(page + 1);
				}
			},
			{ root: songListRef.current, threshold: 0.9 }
		);

		observer.observe(loadMoreRef.current);

		return () => {
			observer.disconnect();
		};
	}, [filteredSongs, page]);

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
