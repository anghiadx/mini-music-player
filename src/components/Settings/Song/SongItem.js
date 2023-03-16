import { useState, useRef, useEffect } from "react";
import Lottie from "lottie-react";
import * as eyeAnimate from "../../../assets/effects/eye-animation.json";

function SongItem({ id, data, index, newHideList }) {
	const isHide = newHideList.includes(+id);

	const [hide, setHide] = useState(isHide);

	const iconRef = useRef();

	useEffect(() => {
		hide !== isHide && setHide(isHide);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [newHideList]);

	useEffect(() => {
		if (hide) {
			!isHide && newHideList.push(+id);

			iconRef.current.setDirection(-1);
			iconRef.current.play();
		} else {
			if (isHide) {
				const index = newHideList.findIndex((idHide) => idHide === +id);
				newHideList.splice(index, 1);
			}

			iconRef.current.setDirection(1);
			iconRef.current.goToAndPlay(0, true);
		}
	}, [id, isHide, hide, newHideList]);

	useEffect(() => {
		iconRef.current.setSpeed(4.5);
	}, []);

	return (
		<div
			title={`${hide ? "Hiện" : "Ẩn"}: ${data.name}`}
			className="flex items-center border mb-[8px] cursor-pointer hover:shadow-style-1 hover:bg-[#fafafa]"
			onClick={() => setHide(!hide)}
		>
			<div className="shrink-0 w-[30px] text-center">
				<Lottie lottieRef={iconRef} animationData={eyeAnimate} loop={false} autoPlay={false} />
			</div>
			<div className="shrink-0 w-[50px] text-center">{index + 1}</div>
			<div className="shrink-0 flex justify-center items-center w-[50px] h-[50px]">
				<i
					className="block bg-cover bg-center w-[40px] h-[40px] rounded-[4px]"
					style={{
						backgroundImage: `url('${data.imageURL}')`,
					}}
				></i>
			</div>
			<p className="grow pl-[12px] line-clamp-1">{data.name}</p>
		</div>
	);
}

export default SongItem;
