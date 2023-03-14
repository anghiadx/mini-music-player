import { useState, useRef, useEffect } from "react";
import Lottie from "lottie-react";
import { useSelector, useDispatch } from "react-redux";

import { setHideList } from "../../../redux/slices/songSlice";
import * as applyAnimate from "../../../assets/effects/apply-animation.json";
import * as cancelAnimate from "../../../assets/effects/cancel-animation.json";
import SongItem from "./SongItem";

function Song() {
	const dispatch = useDispatch();
	const { allSongs, hideList } = useSelector((state) => state.song);

	const [newHideList, setNewHideList] = useState([...hideList]);

	// Ref
	const cancelBtnRef = useRef();
	const applyBtnRef = useRef();

	useEffect(() => {
		cancelBtnRef.current.goToAndStop(59, true);
		applyBtnRef.current.goToAndStop(149, true);
	}, []);

	return (
		<div className="flex flex-col px-[12px] py-[8px]">
			<h1 className="pb-[8px] font-bold">Ẩn/hiện bài hát</h1>
			<section className="grow flex flex-col text-[13px] overflow-y-auto border-y-[1px]">
				{/* List */}
				{allSongs.map((song, index) => {
					return <SongItem key={index} id={song.id} data={song} index={index} newHideList={newHideList} />;
				})}
			</section>
			<footer className="flex justify-center items-center] my-[-8px] pt-[8px]">
				{/* Cancel btn */}
				<button
					title="Hủy bỏ"
					className="w-[50px]"
					onClick={() => {
						setNewHideList([...hideList]);
						cancelBtnRef.current.goToAndPlay(0, true);
					}}
				>
					<Lottie lottieRef={cancelBtnRef} animationData={cancelAnimate} loop={false} autoplay={false} />
				</button>

				{/* Apply btn */}
				<button
					title="Áp dụng"
					className="w-[50px] px-[6px] ml-[50px]"
					onClick={() => {
						const action = setHideList([...newHideList]);
						dispatch(action);
						applyBtnRef.current.goToAndPlay(0, true);
					}}
				>
					<Lottie lottieRef={applyBtnRef} animationData={applyAnimate} loop={false} autoplay={false} />
				</button>
			</footer>
		</div>
	);
}

export default Song;
