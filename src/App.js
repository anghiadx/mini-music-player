import { useState, useEffect, useRef, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { setAllSongs } from "./redux/slices/songSlice";
import images from "./assets/images";
import MusicControl from "./components/Musics/MusicControl";
import MusicTimeControl from "./components/Musics/MusicTimeControl";
import MusicVolumeControl from "./components/Musics/MusicVolumeControl";
import MusicList from "./components/Musics/MusicList";
import configs from "./configs";
import { useLocalStorage } from "./hooks";
import MusicTimer from "./components/Musics/MusicTimer";

function App() {
	// Get local storage method
	const { getStorage } = useLocalStorage();

	// Redux
	const dispatch = useDispatch();
	const { currentList } = useSelector((state) => state.playList);

	// State
	const [currentIndex, setCurrentIndex] = useState(0);

	// Create audio element
	const audioRef = useRef(new Audio());

	// Get background from redux
	const { idActive: idBackground } = useSelector((state) => state.background);
	const backgroundUrl = configs?.backgrounds[idBackground]?.url;

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
			className="relative flex justify-center min-[466px]:items-center min-h-screen max-h-screen bg-main-background bg-cover animate-bgMove transition-bg-image duration-700"
			style={{ backgroundImage: `url(${backgroundUrl})` }}
		>
			{/* <div className="fixed inset-0 overflow-hidden z-[9999] pointer-events-none">
				<Lottie animationData={rainAnimate} />
			</div> */}
			<div className="relative z-10 flex flex-col w-[450px] mx-[4px] my-[8px]">
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
					<MusicList currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
				</section>
			</div>

			<p className="auth">NghiaNe</p>
		</div>
	);
}

export default App;
