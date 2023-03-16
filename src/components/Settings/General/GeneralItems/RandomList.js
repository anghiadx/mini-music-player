import { useState, useLayoutEffect } from "react";
import useLocalStorage from "../../../../hooks/useLocalStorage";
import Container from "./Container";

function RandomList() {
	const { getStorage, setStorage } = useLocalStorage();
	const [isRandom, setIsRandom] = useState(getStorage("is-random-list") === false ? false : true);

	useLayoutEffect(() => {
		setStorage("is-random-list", isRandom);
	}, [isRandom, setStorage]);

	return (
		<Container title="Xáo trộn danh sách" switchState={[isRandom, setIsRandom]}>
			Quyết định xem danh sách phát có nên được xáo trộn mỗi khi truy cập hay không (Áp dụng từ lần truy cập kế
			tiếp).
		</Container>
	);
}

export default RandomList;
