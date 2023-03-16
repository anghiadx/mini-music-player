import { useRef } from "react";
import Lottie from "lottie-react";
import * as settingAnimation from "../../assets/effects/setting-animation.json";
import { memo } from "react";
import { useModal } from "../../hooks";
import SettingModal from "../modals/SettingModal";

function MusicSetting({ className }) {
	const iconRef = useRef();

	// Create modal
	const [SettingModalComponent, showSettingModal] = useModal(SettingModal);

	const handleClickSetting = () => {
		iconRef.current.goToAndPlay(60, true);
		showSettingModal();
	};

	return (
		<>
			<button className={className} onClick={handleClickSetting}>
				<Lottie lottieRef={iconRef} animationData={settingAnimation} loop={false} />
			</button>
			<SettingModalComponent />
		</>
	);
}

export default memo(MusicSetting);
