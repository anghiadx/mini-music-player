import { createContext, useState } from "react";

export const AudioContextKey = createContext();

function AudioContext({ children }) {
	const [isPlaying, setIsPlaying] = useState(false);

	const values = {
		playingState: [isPlaying, setIsPlaying],
	};

	return <AudioContextKey.Provider value={values}>{children}</AudioContextKey.Provider>;
}

export default AudioContext;
