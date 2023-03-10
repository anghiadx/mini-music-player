import { useState, useEffect, useRef } from "react";
import images from "./assets/images";
import MusicControl from "./components/MusicControl";
import MusicItem from "./components/MusicItem";
import MusicTimeControl from "./components/MusicTimeControl";
import MusicVolumeControl from "./components/MusicVolumeControl";
import Lottie from "lottie-react";
import * as musicLoading from "./assets/effects/music-loading.json";

function App() {
	const [songs, setSongs] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);

	// Create audio element
	const audioRef = useRef(new Audio());

	// Get current song and set path for audio
	const currentSong = songs[currentIndex];

	if (currentSong) {
		audioRef.current.src = currentSong.path;
		document.title = currentSong.name;
	}

	// Call api to get songs
	useEffect(() => {
		const fetchSongs = async () => {
			try {
				const response = await (await fetch("https://api.nghiane.online/music-player/view/")).json();
				const result = response.data.sort(() => Math.random() - 0.5); // random list

				setSongs(result);
			} catch (e) {
				console.log("Failed to fetch: ", e);
			}
		};
		fetchSongs();
	}, []);

	return (
		<div className="flex justify-center min-[466px]:items-center min-h-screen max-h-screen bg-main-background bg-cover animate-bgMove">
			<div className="flex flex-col w-[450px] mx-[4px] my-[8px]">
				<header className="shrink-0 relative p-[16px] min-[466px]:p-[24px] bg-[rgba(255,255,255,0.7)] rounded-[4px] min-[466px]:rounded-[8px] overflow-hidden">
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
							songLength={songs.length}
							currentSong={currentSong}
							audio={audioRef.current}
							setIndex={setCurrentIndex}
						/>
						{/* Volume control */}
						<MusicVolumeControl audio={audioRef.current} currentSong={currentSong} />
					</div>
				</header>

				<section className="grow flex flex-col relative px-[16px] min-[466px]:px-[24px] py-[12px] bg-[rgba(255,255,255,0.7)] rounded-[8px] mt-[4px] min-[466px]:mt-[8px] overflow-hidden">
					<div
						className="absolute inset-0 bg-cover bg-center opacity-[0.16] blur-md transition-bg-image duration-700"
						style={{ backgroundImage: `url('${currentSong?.imageURL || images.transparent}')` }}
					></div>
					<h3 className="relative font-bold text-[15px] italic">Play list</h3>

					{/* Song list */}
					<div className="grow relative min-[466px]:h-[320px] mt-[8px] mr-[-4px] overflow-y-auto">
						{songs.map((song, index) => {
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

						{!songs.length && (
							<span className="absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] w-[124px] pointer-events-none">
								<Lottie animationData={musicLoading} />
							</span>
						)}
					</div>
				</section>
			</div>
		</div>
	);
}

export default App;
