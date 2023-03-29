import { useState, useRef, useEffect, useMemo } from "react";
import Lottie from "lottie-react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { setHideList } from "../../../redux/slices/songSlice";
import * as applyAnimate from "../../../assets/effects/apply-animation.json";
import * as cancelAnimate from "../../../assets/effects/cancel-animation.json";
import * as catAnimate from "../../../assets/effects/cat-animation.json";
import Search from "./Search";
import SongItem from "./SongItem";
import { isIncludeString } from "../../../funcHandler";

function Song() {
	// Redux
	const dispatch = useDispatch();
	const { allSongs, hideList } = useSelector((state) => state.song);

	// State
	const [newHideList, setNewHideList] = useState([...hideList]);
	const [keyword, setKeyword] = useState("");
	const [page, setPage] = useState(1);
	const songsOfPage = 10;

	// Ref
	const cancelBtnRef = useRef();
	const applyBtnRef = useRef();
	const loadMoreRef = useRef();
	const sectionRef = useRef();

	// Filter the list by search keyword
	const filteredSongs = useMemo(() => {
		setPage(1);
		sectionRef?.current?.scrollTo({ behavior: "smooth", top: 0 });

		const filter = allSongs.filter((song) => {
			const songName = song.name;
			return isIncludeString(songName, keyword);
		});

		return filter;
	}, [allSongs, keyword]);

	const currentList = useMemo(() => {
		return filteredSongs.slice(0, page * songsOfPage);
	}, [filteredSongs, page]);

	useEffect(() => {
		// Set default status for cancel and apply button
		cancelBtnRef.current.goToAndStop(14, true);
		applyBtnRef.current.goToAndStop(14, true);

		// Use intersectionObserve to follow inview state of loadmore element
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setPage((prevPage) => prevPage + 1);
				}
			},
			{ root: sectionRef.current, threshold: 0.9 }
		);

		observer.observe(loadMoreRef.current);

		return () => {
			observer.disconnect();
		};
	}, []);

	const handleCancel = () => {
		setNewHideList([...hideList]);
		setKeyword("");
		cancelBtnRef.current.goToAndPlay(0, true);

		// Show toast
		toast.info("Đã hủy bỏ các thay đổi!");
	};

	const handleApply = () => {
		// Check if current playlist is less than 2 then don't hide and show notifications
		const songIds = allSongs.map((song) => +song.id);

		const totalHideIds = newHideList.filter((hideId) => {
			return songIds.includes(hideId);
		});

		const currentSongLength = songIds.length - totalHideIds.length;
		if (currentSongLength <= 1) {
			toast.error("Danh sách phát không thể có ít hơn 2 bài hát!!");
			return;
		}

		// If the conditions are met, update the changes
		const action = setHideList([...newHideList]);
		dispatch(action);
		applyBtnRef.current.goToAndPlay(0, true);

		// Show toast
		toast.success("Đã áp dụng các thay đổi!");
	};

	return (
		<div className="flex flex-col px-[12px] py-[8px]">
			<header className="pb-[8px]">
				<h1 className="font-bold">Ẩn/hiện bài hát</h1>
				<Search newHideList={newHideList} setKeyword={setKeyword} />
			</header>

			<section
				ref={sectionRef}
				className="relative grow flex flex-col text-[13px] overflow-y-auto border-y-[1px]"
			>
				{/* Song List */}
				{currentList.length ? (
					currentList.map((song, index) => {
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

				{/* Loadmore element */}
				<div ref={loadMoreRef} className="h-[4px] shrink-0"></div>
			</section>

			<footer className="flex justify-center items-center] my-[-8px] pt-[8px]">
				{/* Cancel btn */}
				<button title="Hủy bỏ" className="w-[48px]" onClick={handleCancel}>
					<Lottie lottieRef={cancelBtnRef} animationData={cancelAnimate} loop={false} autoplay={false} />
				</button>

				{/* Apply btn */}
				<button title="Áp dụng" className="w-[48px] ml-[50px]" onClick={handleApply}>
					<Lottie lottieRef={applyBtnRef} animationData={applyAnimate} loop={false} autoplay={false} />
				</button>
			</footer>
		</div>
	);
}

export default Song;
