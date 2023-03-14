import { useState, useLayoutEffect } from "react";
import useLocalStorage from "../../../../hooks/useLocalStorage";

function RandomList() {
	const { getStorage, setStorage } = useLocalStorage();
	const [isRandom, setIsRandom] = useState(getStorage("is-random-list") === false ? false : true);

	useLayoutEffect(() => {
		setStorage("is-random-list", isRandom);
	}, [isRandom, setStorage]);

	return (
		<div className="p-[8px] pt-0 rounded-[4px] shadow-style-2">
			<header className="flex justify-between py-[6px] border-b-[1px]">
				<h1 className="text-[16px] font-bold">Xáo trộn danh sách</h1>
				<button>
					<input
						id="random-list-song"
						type="checkbox"
						className="switch-checkbox"
						hidden
						checked={isRandom}
						onChange={() => setIsRandom(!isRandom)}
					/>
					<label htmlFor="random-list-song" className="switch-label"></label>
				</button>
			</header>
			<p className="mt-[16px] text-justify leading-[18px]">
				Quyết định xem danh sách phát có nên được xáo trộn mỗi khi truy cập hay không (Áp dụng từ lần truy cập
				kế tiếp).
			</p>
		</div>
	);
}

export default RandomList;
