import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faVolumeHigh, faVolumeLow } from "@fortawesome/free-solid-svg-icons";
import images from "./assets/images";
import MusicControl from "./components/MusicControl";
import MusicItem from "./components/MusicItem";
import MusicTimeControl from "./components/MusicTimeControl";

function App() {
	const [songs, setSongs] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);

	// Create audio element
	const audioRef = useRef(new Audio());

	// Get current song and set path for audio
	const currentSong = songs[currentIndex];
	audioRef.current.src = currentSong ? currentSong.path : null;

	// Call api to get songs
	useEffect(() => {
		const fetchSongs = async () => {
			try {
				const result = await (await fetch("https://api.nghiane.cf/music-player/view/")).json();
				setSongs(result.data);
			} catch (e) {
				console.log("Failed to fetch: ", e);
			}
		};
		fetchSongs();
	}, []);

	return (
		<div className="app min-h-screen bg-main-background bg-cover bg-center">
			<div className="fixed inset-0 m-auto w-[450px] h-fit">
				<header className="p-[24px] bg-[rgba(255,255,255,0.7)] rounded-[8px]">
					{/* Thumb and name of song */}
					<div className="flex">
						<div
							className="w-[80px] h-[80px] mr-[12px] rounded-[8px] bg-[#aaa] bg-cover"
							style={{ backgroundImage: `url('${currentSong?.imageURL || images.thumb}')` }}
						></div>
						<p className="mt-[8px] font-bold">{currentSong?.name || "Mini Music Player"}</p>
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

					<div className="flex justify-between items-center">
						<span>
							<FontAwesomeIcon icon={faVolumeLow} />
						</span>
						<div className="grow mx-[24px] h-[3px] bg-black"></div>
						<span>
							<FontAwesomeIcon icon={faVolumeHigh} />
						</span>
					</div>
				</header>

				<section className="min-h-[350px] px-[24px] py-[12px] bg-[rgba(255,255,255,0.7)] rounded-[8px] mt-[8px]">
					<h3 className="font-bold text-[15px] italic">Play list</h3>

					{/* Song list */}
					<div className="relative h-[320px] mt-[8px] overflow-y-auto">
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
							<span className="absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] text-[24px] leading-[0]">
								<FontAwesomeIcon className="animate-spin" icon={faCircleNotch} />
							</span>
						)}
					</div>
				</section>
			</div>
		</div>
	);
}

export default App;
