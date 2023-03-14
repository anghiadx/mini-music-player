import { createPortal } from "react-dom";
import { useState } from "react";

function useModal(Modal) {
	const [isShow, setIsShow] = useState(false);

	const showModal = () => {
		setIsShow(true);
	};
	const closeModal = () => {
		setIsShow(false);
	};

	const ModalExport = () => {
		return isShow && createPortal(<Modal closeModal={closeModal} />, document.body);
	};

	return [ModalExport, showModal];
}

export default useModal;
