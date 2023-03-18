import { useState, useEffect, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setAllSongs } from "./redux/slices/songSlice";
import images from "./assets/images";
import MusicControl from "./components/Musics/MusicControl";
import MusicItem from "./components/Musics/MusicItem";
import MusicTimeControl from "./components/Musics/MusicTimeControl";
import MusicVolumeControl from "./components/Musics/MusicVolumeControl";
import Lottie from "lottie-react";
import * as loadingAnimate from "./assets/effects/loading-animation.json";
import * as nothingAnimate from "./assets/effects/nothing-animation.json";
import configs from "./configs";
import { useLocalStorage } from "./hooks";
import MusicTimer from "./components/Musics/MusicTimer";

function App() {
	// Get local storage method
	const { getStorage } = useLocalStorage();

	// Redux
	const dispatch = useDispatch();
	const { allSongs, hideList } = useSelector((state) => state.song);

	const [currentIndex, setCurrentIndex] = useState(0);

	// Create audio element
	const audioRef = useRef(new Audio());

	// Get background from redux
	const { idActive: idBackground } = useSelector((state) => state.background);
	const backgroundUrl = configs?.backgrounds[idBackground]?.url;

	// Get current list
	const currentList = useMemo(() => {
		if (hideList.length === 0) {
			return allSongs;
		}
		const currentList = allSongs.filter((song) => {
			return !hideList.includes(+song.id);
		});

		return currentList;
	}, [hideList, allSongs]);

	// Get current song and set path for audio
	const currentSong = currentList[currentIndex];
	useMemo(() => {
		if (currentSong) {
			audioRef.current.src = currentSong.path;
			document.title = currentSong.name + " - Mini Music Player";
		} else {
			setCurrentIndex(0);
		}
	}, [currentSong]);

	// Call api to get all songs
	useEffect(() => {
		const fetchSongs = async () => {
			try {
				const response = await (await fetch("https://api.nghiane.online/music-player/view/")).json();

				// Random list or not
				const isRandomList = getStorage("is-random-list") === false ? false : true;
				const result = isRandomList ? response.data.sort(() => Math.random() - 0.5) : response.data;

				dispatch(setAllSongs(result));
			} catch (e) {
				console.log("Failed to fetch: ", e);
			}
		};
		fetchSongs();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div
			className="flex justify-center min-[466px]:items-center min-h-screen max-h-screen bg-main-background bg-cover animate-bgMove transition-bg-image duration-700"
			style={{ backgroundImage: `url(${backgroundUrl})` }}
		>
			{/* <div className="fixed inset-0 overflow-hidden z-[9999] pointer-events-none">
				<Lottie animationData={rainAnimate} />
			</div> */}
			<div className="flex flex-col w-[450px] mx-[4px] my-[8px]">
				<header className="shrink-0 relative p-[16px] min-[466px]:p-[24px] bg-[rgba(255,255,255,0.65)] rounded-[4px] min-[466px]:rounded-[8px] overflow-hidden">
					<div
						className="absolute inset-0 bg-cover bg-center opacity-[0.2] blur transition-bg-image duration-700"
						style={{ backgroundImage: `url('${currentSong?.imageURL || images.transparent}')` }}
					></div>
					<div className="relative">
						{/* Thumb and name of song */}
						<div className="flex mr-[32px]">
							<div
								className="shrink-0 w-[80px] h-[80px] mr-[12px] rounded-[8px] bg-[#aaa] bg-cover"
								style={{ backgroundImage: `url('${currentSong?.imageURL || images.thumb}')` }}
							></div>
							<p className="h-fit mt-[8px] line-clamp-2 font-bold">
								{currentSong?.name || "Mini Music Player"}
							</p>
						</div>
						{/* Time update */}
						<MusicTimeControl audio={audioRef.current} currentSong={currentSong} />
						{/* Play/Pause - Next - Previos */}
						<MusicControl
							songLength={currentList.length}
							currentSong={currentSong}
							audio={audioRef.current}
							setIndex={setCurrentIndex}
						/>
						{/* Volume control */}
						<MusicVolumeControl audio={audioRef.current} currentSong={currentSong} />
					</div>
				</header>

				<section className="grow flex flex-col relative px-[16px] min-[466px]:px-[24px] py-[12px] bg-[rgba(255,255,255,0.65)] rounded-[8px] mt-[4px] min-[466px]:mt-[8px] overflow-hidden">
					<div
						className="absolute inset-0 bg-cover bg-center opacity-[0.16] blur-md transition-bg-image duration-700"
						style={{ backgroundImage: `url('${currentSong?.imageURL || images.transparent}')` }}
					></div>

					<div className="shrink-0 relative flex justify-between h-[25px] overflow-hidden">
						<h3 className="font-bold text-[15px] italic">Play list</h3>
						<MusicTimer />
					</div>

					{/* Song list */}
					<div className="grow relative min-[466px]:h-[320px] mt-[8px] mr-[-4px] overflow-y-auto">
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

						{/* Show animation when loading */}
						{!allSongs.length && (
							<span className="absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] w-[124px] pointer-events-none">
								<Lottie animationData={loadingAnimate} />
							</span>
						)}

						{/* Show animation when song list is empty */}
						{!!allSongs.length && !currentList.length && (
							<span className="absolute w-[250px] top-0 left-1/2 translate-x-[-50%]">
								<Lottie animationData={nothingAnimate} />
							</span>
						)}
					</div>
				</section>
			</div>
		</div>
	);
}

export default App;
