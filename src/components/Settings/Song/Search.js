import { useState, useEffect, useRef } from "react";
import Lottie from "lottie-react";
import * as searchAnimate from "../../../assets/effects/search-animation.json";
import { useDebounce } from "../../../hooks";

function Search({ setKeyword, newHideList }) {
	const [searchValue, setSearchValue] = useState("");
	const [isFocus, setIsFocus] = useState(false);

	const keyword = useDebounce(searchValue);

	useEffect(() => {
		setKeyword(keyword);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [keyword]);

	// Reset search value when click cancel btn
	useEffect(() => {
		setSearchValue("");
	}, [newHideList]);

	// Ref
	const inputRef = useRef();

	return (
		<form
			className={`flex h-[40px] my-[12px] mx-auto px-[8px] max-w-[400px] rounded-full overflow-hidden shadow-style-3 text-[14px] transition-colors ${
				isFocus ? "bg-white" : "bg-[#f9f9f9]"
			}`}
			onSubmit={(e) => {
				e.preventDefault();
				inputRef.current.blur();
			}}
		>
			{/* icon search */}
			<span
				className={`self-center p-[2px] transition-all duration-300 ${isFocus ? "w-0 opacity-0" : "w-[40px]"}`}
			>
				<Lottie animationData={searchAnimate} />
			</span>
			<input
				ref={inputRef}
				type="text"
				value={searchValue}
				placeholder="Tìm kiếm tên bài hát"
				spellCheck={false}
				className="grow px-[8px] focus:outline-none bg-transparent"
				onChange={(e) => {
					const value = e.target.value;
					value.startsWith(" ") || setSearchValue(value);
				}}
				onFocus={() => setIsFocus(true)}
				onBlur={() => setIsFocus(false)}
			/>
		</form>
	);
}

export default Search;
