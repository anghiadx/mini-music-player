import { useEffect } from "react";
import Lottie from "lottie-react";
import { useSelector, useDispatch } from "react-redux";

import { setIdActive } from "../../redux/slices/backgroundSlice";
import * as tickAnimate from "../../assets/effects/tick-animation.json";
import configs from "../../configs";

function Background() {
	// Redux
	const dispatch = useDispatch();
	const { idActive } = useSelector((state) => state.background);

	useEffect(() => {
		const IMG = new Image();
		IMG.src = configs.backgrounds[2].url;
	}, []);

	return (
		<div className="flex flex-col items-center p-[12px] overflow-y-auto italic">
			{configs.backgrounds.map((background, index) => {
				return (
					<div
						key={index}
						className={`shrink-0 relative mb-[16px] rounded-[8px] cursor-pointer overflow-hidden hover:opacity-[1] transition-opacity
                        ${idActive === index ? "opacity-[1]" : "opacity-[0.6]"}`}
						onClick={() => idActive !== index && dispatch(setIdActive(index))}
					>
						<img className="w-full max-w-[400px]" src={background.previewUrl} alt={background.name} />
						{idActive === index && (
							<span className="absolute top-[4px] right-[8px] w-[50px]">
								<Lottie animationData={tickAnimate} loop={false} />
							</span>
						)}
						<p className="absolute bottom-[4px] left-[8px] text-white font-bold">{background.name}</p>
					</div>
				);
			})}
		</div>
	);
}

export default Background;
