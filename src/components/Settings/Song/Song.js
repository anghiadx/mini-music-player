import { useState, useRef, useEffect, useMemo } from "react";
import Lottie from "lottie-react";
import { useSelector, useDispatch } from "react-redux";

import { setHideList } from "../../../redux/slices/songSlice";
import * as applyAnimate from "../../../assets/effects/apply-animation.json";
import * as cancelAnimate from "../../../assets/effects/cancel-animation.json";
import * as catAnimate from "../../../assets/effects/cat-animation.json";
import Search from "./Search";
import SongItem from "./SongItem";
import { isIncludeString } from "../../../funcHandler";

function Song() {
	const dispatch = useDispatch();
	const { allSongs, hideList } = useSelector((state) => state.song);

	const [newHideList, setNewHideList] = useState([...hideList]);
	const [keyword, setKeyword] = useState("");

	// Filter the list by search keyword
	const filteredSongs = useMemo(
		() =>
			allSongs.filter((song) => {
				const songName = song.name;
				return isIncludeString(songName, keyword);
			}),
		[allSongs, keyword]
	);

	// Ref
	const cancelBtnRef = useRef();
	const applyBtnRef = useRef();

	useEffect(() => {
		cancelBtnRef.current.goToAndStop(59, true);
		applyBtnRef.current.goToAndStop(149, true);
	}, []);

	return (
		<div className="flex flex-col px-[12px] py-[8px]">
			<header className="pb-[8px]">
				<h1 className="font-bold">Ẩn/hiện bài hát</h1>
				<Search newHideList={newHideList} setKeyword={setKeyword} />
			</header>

			<section className="relative grow flex flex-col text-[13px] overflow-y-auto border-y-[1px]">
				{/* Song List */}
				{filteredSongs.length ? (
					filteredSongs.map((song, index) => {
						return (
							<SongItem key={index} id={song.id} data={song} index={index} newHideList={newHideList} />
						);
					})
				) : (
					<span className="absolute top-1/2 left-1/2 w-full translate-x-[-50%] translate-y-[-50%] text-center animate-fade-in">
						<Lottie className="max-w-[230px] mt-[-16px] mx-auto" animationData={catAnimate} />
						<span className="font-[600] text-[#888]">Không tìm thấy bài hát nào :((</span>
					</span>
				)}
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
