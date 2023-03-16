import { useState, useRef } from "react";
import configs from "../../configs";

function SettingModal({ closeModal }) {
	const [isClose, setIsClose] = useState(false);
	const [tab, setTab] = useState(0);

	const ComponentTab = configs.settings[tab].component;

	// Ref
	const slideBarRef = useRef();

	const handleCloseModal = () => {
		setIsClose(true);
	};

	const handleChangeTab = (indexTab, event) => {
		if (indexTab !== tab) {
			setTab(indexTab);

			const element = event.target;
			const left = element.offsetLeft;
			const width = element.offsetWidth;

			slideBarRef.current.style.width = width + "px";
			slideBarRef.current.style.left = left + "px";
		}
	};

	return (
		<div
			className={`fixed inset-0 flex justify-center text-[15px] bg-[rgba(0,0,0,0.3)] ${
				isClose ? "animate-fade-out" : "animate-fade-in"
			}`}
			onAnimationEnd={() => {
				isClose && closeModal();
			}}
		>
			{/* Overlay */}
			<div className="absolute inset-0 cursor-pointer blur-md" onClick={handleCloseModal}></div>

			{/* MAIN MODAL */}
			<div
				className={`flex flex-col relative p-[16px] w-full max-w-[600px] h-[calc(100%-4px)] max-h-[650px] mx-[4px] bg-white rounded-b-[4px] ${
					isClose ? "animate-slide-out" : "animate-slide-in"
				}`}
			>
				{/* header */}
				<header>
					<h1 className="mb-[16px] text-[24px] font-bold">Cài đặt</h1>
					<nav className="relative flex border-b-[2px] border-[#eee]">
						{/* Render setting names */}
						{configs.settings.map((setting, index) => {
							return (
								<div
									key={index}
									className={`pr-[16px] font-bold pb-[8px] cursor-pointer 
										${index !== tab && "text-[#aaa]"}
										${index !== 0 && "pl-[16px]"} 
									`}
									onClick={(e) => handleChangeTab(index, e)}
								>
									{setting.name}
								</div>
							);
						})}
						<span
							ref={slideBarRef}
							className="absolute left-0 bottom-0 w-[62px] h-[2px] bg-black transition-all duration-300"
						></span>
					</nav>
				</header>

				<section className="grow flex my-[12px] border overflow-hidden [&>*]:grow">
					{/* inner Section */}
					<ComponentTab />
				</section>

				<footer className="text-center">
					<button
						className="w-[200px] px-[12px] py-[8px] bg-black text-white font-bold rounded-[2px] border hover:bg-[#3e3e3e]"
						onClick={handleCloseModal}
					>
						Đóng
					</button>
				</footer>
			</div>
		</div>
	);
}

export default SettingModal;
