import { useState, useRef, useEffect } from "react";
import Lottie from "lottie-react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import { setHideList } from "../../../redux/slices/songSlice";
import * as applyAnimate from "../../../assets/effects/apply-animation.json";
import * as cancelAnimate from "../../../assets/effects/cancel-animation.json";
import * as catAnimate from "../../../assets/effects/cat-animation.json";
import Search from "./Search";
import SongItem from "./SongItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

function Song() {
	// Redux
	const dispatch = useDispatch();
	const { hideList } = useSelector((state) => state.song);

	// State
	const [songs, setSongs] = useState([]);
	const [songIds, setSongIds] = useState([]);
	const [newHideList, setNewHideList] = useState([...hideList]);
	const [keyword, setKeyword] = useState("");
	const [page, setPage] = useState(0);
	const songOfPage = 10;
	const [loading, setLoading] = useState(false);

	// Ref
	const cancelBtnRef = useRef();
	const applyBtnRef = useRef();
	const loadMoreRef = useRef();
	const sectionRef = useRef();

	useEffect(() => {
		// Set default status for cancel and apply button
		cancelBtnRef.current.goToAndStop(14, true);
		applyBtnRef.current.goToAndStop(14, true);
	}, []);

	// Get ids array
	useEffect(() => {
		const fetchSongIds = async function () {
			const url = "https://api.nghiane.online/music/songs/";
			const response = await (await fetch(url)).json();

			const ids = response.data.map((song) => +song.id);

			setSongIds(ids);
		};

		fetchSongIds();
	}, []);

	// Reset page and songs when keyword is changed
	useEffect(() => {
		setPage(0);
		setSongs([]);
		setLoading(true);
	}, [keyword]);

	// Every time the keyword changes, re-track the loadmore element to update the page in the most accurate way
	useEffect(() => {
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
	}, [keyword]);

	// When the page changes, call the api to get the songs on the corresponding page and append to the old array
	useEffect(() => {
		const fetchSongs = async function () {
			const url = `https://api.nghiane.online/music/search/?q=${keyword}&per_page=${songOfPage}&page=${page}`;
			const response = await (await fetch(url)).json();

			if (response.data.length > 0) {
				setSongs((prevSongs) => prevSongs.concat(response.data));
			}

			setLoading(false);
		};

		page !== 0 && fetchSongs();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);

	const handleCancel = () => {
		setNewHideList([...hideList]);
		setKeyword("");
		cancelBtnRef.current.goToAndPlay(0, true);

		// Show toast
		toast.info("Đã hủy bỏ các thay đổi!");
	};

	const handleApply = () => {
		// Check if current playlist is less than 2 then don't hide and show notifications
		if (songIds.length === 0) {
			return;
		}

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
				{songs.length ? (
					songs.map((song, index) => {
						return (
							<SongItem key={index} id={song.id} data={song} index={index} newHideList={newHideList} />
						);
					})
				) : (
					<span className="absolute top-1/2 left-1/2 w-full translate-x-[-50%] translate-y-[-50%] text-center animate-fade-in">
						{loading ? (
							<span className="inline-block leading-[0] text-[18px] animate-spin">
								<FontAwesomeIcon icon={faCircleNotch} />
							</span>
						) : (
							<>
								<Lottie className="max-w-[230px] mt-[-16px] mx-auto" animationData={catAnimate} />
								<span className="font-[600] text-[#888]">Không có bài hát nào :((</span>
							</>
						)}
					</span>
				)}

				{/* Loadmore element */}
				<div ref={loadMoreRef} className="shrink-0 h-[4px]"></div>
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
