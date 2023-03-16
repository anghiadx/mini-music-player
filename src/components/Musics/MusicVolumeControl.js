import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeLow } from "@fortawesome/free-solid-svg-icons";
import { useLocalStorage } from "../../hooks";

function MusicVolumeControl({ audio, currentSong }) {
	const { getStorage, setStorage } = useLocalStorage();
	const [volumePercent, setVolumePercent] = useState(getStorage("volume") || 50); // 50%

	if (currentSong) {
		const volume = volumePercent / 100;
		audio.volume = volume;
	}

	return (
		<div className="flex justify-between items-center">
			<span>
				<FontAwesomeIcon icon={faVolumeLow} />
			</span>

			<div className="relative grow mx-[24px] h-[3px] bg-black">
				<div className="relative h-full bg-white" style={{ width: volumePercent + "%" }}>
					<div
						className="absolute top-1/2 right-[0.5px]
                                after:content-[''] after:block after:w-[13px] after:h-[13px] after:rounded-full 
                                after:bg-white after:translate-y-[-50%] after:translate-x-full
                                "
						style={{ transform: `translateX(-${volumePercent}%)` }}
					></div>
				</div>
				<input
					type="range"
					min="0"
					max="100"
					step="1"
					className="absolute top-0 left-0 w-[calc(100%+4px)] ml-[-2px] translate-y-[-45%] opacity-0 cursor-pointer"
					onInput={(e) => {
						const value = parseInt(e.target.value);
						setVolumePercent(value);

						// Save volume value to local storage
						setStorage("volume", value);
					}}
				/>
			</div>
			<span>
				<FontAwesomeIcon icon={faVolumeHigh} />
			</span>
		</div>
	);
}

export default MusicVolumeControl;
